class CreateProducts < ActiveRecord::Migration[8.0]
  def change
    create_table :products do |t|
      t.string :pname
      t.string :category
      t.integer :price
      t.text :description
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
