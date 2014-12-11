json.array! @businesses do |business|
  json.extract! business, :id, :title, :description, :category_id, :rss_feed_url, :created_at, :updated_at, :image_source
  json.first_article business.articles.order('published_at DESC').first
  # only get the first article via a SQL query perhaps
end

# json.articles @business.articles do |article|
#   json.extract! article, :guid, :title, :link, :business_id, :published_at, :json
#   break
# end