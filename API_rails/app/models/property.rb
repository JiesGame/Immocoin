class Property < ApplicationRecord
  belongs_to :user
  has_one_attached :featured_image, dependent: :destroy

  validates :title, presence: true, length: { minimum: 10,maximum: 30 }
  validates :description, presence: true, length: { minimum: 40, maximum: 200 }
  validates :price, presence: true, numericality: { greater_than: 0 }
end
