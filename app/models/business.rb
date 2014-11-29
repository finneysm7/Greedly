require 'open-uri'

class Business < ActiveRecord::Base
  validates :title, :rss_feed_url, :category_id, presence: true
  belongs_to :category
  has_many :articles, dependent: :destroy
  has_many :subscriptions, dependent: :destroy
  has_many :users, through: :subscriptions, source: :user
  
  def latest_articles
    reload if updated_at < 30.seconds.ago
    articles
  end
  
  def reload
    
    begin
      feed_data = SimpleRSS.parse(open(rss_feed_url))
      self.title = feed_data.title
      save!
      
      existing_article_guids = Article.pluck(:guid).sort();
      feed_data.entries.each do |entry_data|
        unless existing_article_guids.include?(entry_data.guid)
          Article.create_from_json!(entry_data, self)
        end
      end
      
      self
    rescue SimpleRSSError
      return false
    end
  end 
end
