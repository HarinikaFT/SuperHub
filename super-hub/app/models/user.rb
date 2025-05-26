# app/models/user.rb
class User < ApplicationRecord
  has_secure_password   # Automatically handles password and password_confirmation
   has_many :products, dependent: :destroy
   has_many :requests, dependent: :destroy


  validates :username, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }

  validates :password, presence: true, length: { minimum: 6 }, confirmation: true
  validates :password_confirmation, presence: true

  validates :security_question, presence: true, inclusion: { in: %w[color highschool bestfriend pet city] }
  validates :security_answer, presence: true, length: { minimum: 2 }
end
