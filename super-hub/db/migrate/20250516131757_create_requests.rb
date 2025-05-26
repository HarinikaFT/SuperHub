class CreateRequests < ActiveRecord::Migration[8.0]
  def change
    create_table :requests do |t|
      t.integer :requested_price
      t.references :user, foreign_key: true
      t.references :product, foreign_key: true
      t.string  :status,  default: "pending"
      t.timestamps
    end
  end
end
