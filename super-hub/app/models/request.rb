class Request < ApplicationRecord
  belongs_to :user
  belongs_to :product
  VALID_STATUSES = ["pending", "accepted", "rejected"]


  # Validations
  validates :requested_price, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :status, inclusion: { in: VALID_STATUSES , message: "%{value} is not a valid status" }

end
