class Product < ApplicationRecord
  belongs_to :user
  has_many :requests, dependent: :destroy
  has_one_attached :image

  # Validations
  validates :pname, presence: true
  validates :category, presence: true
  validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :description, presence: true

   def image_url
    if image.attached?
      Rails.application.routes.url_helpers.rails_blob_url(image, only_path: false)
    else
      nil
    end
  end
end
