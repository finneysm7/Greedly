require 'open-uri'

class Business < ActiveRecord::Base
  validates :title, :rss_feed_url, presence: true
  belongs_to :category
  has_many :articles, dependent: :destroy
  has_many :subscriptions, dependent: :destroy
  has_many :users, through: :subscriptions, source: :user
  
  def latest_articles
    reload if updated_at < 10.minutes.ago
    articles.sort { |a, b| b.published_at <=> a.published_at }
  end
  
  def first_article
    articles.order('published_at DESC').first
  end
  
  def reload
    begin
      #not sure if Feedjira will work, I need something that can handle feedburner
      #Feedjira::Feed.fetch_and_parse(rss_feed_url)
      feed_data = Feedjira::Feed.fetch_and_parse(rss_feed_url)#SimpleRSS.parse(open(rss_feed_url))
      self.title = feed_data.title
      save!
      
      existing_article_guids = Article.pluck(:guid).sort();
      feed_data.entries.each do |entry_data|
        #Feedjira entry data has no .guid method
        unless existing_article_guids.include?(entry_data.entry_id)
          Article.create_from_json!(entry_data, self)
        end
      end
      
      self
    rescue SimpleRSSError
      return false
    end
  end
  
  def has_subscription?(user)
    subscriptions.exists?(user_id: user.id)
  end 
end
