
require 'open-uri'
class Article < ActiveRecord::Base
  belongs_to :business

  def self.create_from_json!(entryData, business)
    Article.create!({
      guid: entryData.guid,
      link: entryData.link,
      published_at: entryData.pubDate,
      title: entryData.title,
      # had to change from to_json to to_s etc when I ran into an encoding error
      json: entryData.to_json,
      #to_s.encode('UTF-8', {:invalid => :replace, :undef => :replace, :replace => '?'})
      business_id: business.id
    })
  end
end
