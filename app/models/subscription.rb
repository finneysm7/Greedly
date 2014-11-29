class Subscription < ActiveRecord::Base
  validates :business_id, :user_id, presence: true
  belongs_to :business
  belongs_to :user
end
