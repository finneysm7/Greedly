class CreateBusinesses < ActiveRecord::Migration
  def change
    create_table :businesses do |t|
      t.string :title, null: false
      t.string :rss_feed_url, null: false
      t.text :description
      t.references :category, index: true

      t.timestamps
    end
  end
end
