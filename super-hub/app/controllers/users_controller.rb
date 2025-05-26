require 'jwt'

class UsersController < ApplicationController
  
  before_action :authorize_user, only: [:update_password, :show]

 
  def create
    user = User.new(user_params)
    if user.save
      token = encode_token({ user_id: user.id })
      render json: { user: user_response(user), token: token }, status: :created
    else
      
      render json: { errors: user.errors.messages }, status: :unprocessable_entity
    end
  end

  def login
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      token = encode_token({ user_id: user.id })
      render json: { user: user_response(user), token: token }, status: :ok
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end


  def show
    user = current_user
    if user
      render json: user_response(user), status: :ok
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end
    def update_password
    user = current_user
    if user && user.authenticate(params[:current_password])
    if params[:new_password] == params[:new_password_confirmation]
        if user.update(password: params[:new_password], password_confirmation: params[:new_password_confirmation])
        render json: { message: "Password updated successfully" }, status: :ok
        else
        render json: { errors: user.errors.messages }, status: :unprocessable_entity
        end
    else
        render json: { error: "New password and confirmation do not match" }, status: :unprocessable_entity
    end
    else
    render json: { error: "Current password is incorrect" }, status: :unauthorized
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation, :security_question, :security_answer)
  end



  def user_response(user)
    {
      id: user.id,
      username: user.username,
      email: user.email
      
    }
  end
end
