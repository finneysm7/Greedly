class Business < ActiveRecord::Base
  validates :title, :rss_feed_url, :category_id, presence: true
  belongs_to :category
end
