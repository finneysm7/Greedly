class ChangeUrLtoText < ActiveRecord::Migration
  def up
    change_column :articles, :link, :text
  end
  def down
    change_column :articles, :link, :string
  end
end
