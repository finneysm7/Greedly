json.subscriptions.each do |subscription|
  json.extract! subscription.business, :id, :title, :description, :category_id, :rss_feed_url, :created_at, :updated_at
end