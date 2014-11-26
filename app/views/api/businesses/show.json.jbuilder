json.extract! @business, :id, :title, :description, :category_id, :rss_feed_url, :created_at, :updated_at

json.articles @business.articles do |article|
  json.extract! article, :guid, :title, :link, :business_id, :published_at, :json
end