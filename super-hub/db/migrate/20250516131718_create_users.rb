class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :username, limit:50
      t.string :email
      t.string :password_digest
      t.string  :security_question
      t.string  :security_answer
      t.timestamps
    end
  end
end
