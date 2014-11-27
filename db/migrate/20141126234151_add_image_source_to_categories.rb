class AddImageSourceToCategories < ActiveRecord::Migration
  def change
    add_column :categories, :image_source, :string
  end
end
