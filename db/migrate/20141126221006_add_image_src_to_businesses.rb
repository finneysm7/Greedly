class AddImageSrcToBusinesses < ActiveRecord::Migration
  def change
    add_column :businesses, :image_source, :string
  end
end
