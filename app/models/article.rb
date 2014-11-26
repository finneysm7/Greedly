class Article < ActiveRecord::Base
  belongs_to :business
  
  def self.create_from_json!(entryData, business)
    Article.create!({
      guid: entryData.guid,
      link: entryData.link,
      published_at: entryData.pubDate,
      title: entryData.title,
      json: entryData.to_json,
      business_id: business.id
    })
  end
end
