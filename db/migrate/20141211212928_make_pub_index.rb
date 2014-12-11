class MakePubIndex < ActiveRecord::Migration
  def change
    add_index :articles, :published_at
  end
end
