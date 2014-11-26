class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.string :guid, null: false
      t.string :link, null: false
      t.string :title, null: false
      t.datetime :published_at, null: false
      t.references :business, index: true, null: false
      t.text :json, null: false

      t.timestamps
    end
  end
end
