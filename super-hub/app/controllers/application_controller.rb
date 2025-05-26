class ApplicationController < ActionController::API
  private

  def encode_token(payload)
    JWT.encode(payload, Rails.application.credentials.secret_key_base)
  end

  def decoded_token
    auth_header = request.headers['Authorization']
    if auth_header.present?
      token = auth_header.split(' ').last
      begin
        JWT.decode(token, Rails.application.credentials.secret_key_base, true, algorithm: 'HS256')
      rescue JWT::DecodeError
        nil
      end
    end
  end

  def current_user
    if decoded_token
      user_id = decoded_token[0]['user_id']
      @current_user ||= User.find_by(id: user_id)
    end
  end

  def authorize_user
    render json: { error: "Not authorized" }, status: :unauthorized unless current_user
  end
end
