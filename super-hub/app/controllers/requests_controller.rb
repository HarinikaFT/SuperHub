class RequestsController < ApplicationController
  before_action :authorize_user
  before_action :set_request, only: [:accept, :reject]
  before_action :check_product_owner, only: [:accept, :reject]

  # GET /requests or similar
  def index
    @requests = current_user.requests.includes(:product)
    render json: @requests.as_json(include: { product: { methods: :image_url } })
  end

  # GET /my_requests
  def my_requests
    @requests = current_user.requests.includes(:product)
    render json: @requests.as_json(
      include: {
        product: {
          only: [:id, :pname, :description, :price],
          methods: [:image_url]
        }
      }
    )
  end

  # GET /requested_products
  # Returns products requested by current user, including product's owner details (username)
 def requested_products
 @requests = Request.joins(:product)
                     .where(products: { user_id: current_user.id })
                     .includes(:product)

  render json: @requests.as_json(
    only: [:id, :requested_price, :status, :user_id, :product_id],
    include: {
      product: {
        only: [:id, :pname, :description, :price, :category],
        methods: [:image_url]
      }
    }
  )

end


  # POST /requests
  def create
    @product = Product.find(params[:product_id])
    @request = current_user.requests.build(request_params)
    @request.product = @product

    if @request.save
      render json: @request, status: :created
    else
      render json: { errors: @request.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH /requests/:id/accept
  def accept
    case @request.status
    when 'accepted'
      render json: { message: "Request is already accepted" }, status: :unprocessable_entity
    when 'rejected'
      render json: { message: "Request was rejected earlier, cannot accept" }, status: :unprocessable_entity
    when 'pending'
      if @request.update(status: 'accepted')
        # Reject all other pending requests for the same product
        Request.where(product_id: @request.product_id)
               .where.not(id: @request.id)
               .where(status: 'pending')
               .update_all(status: 'rejected')

        render json: { message: "Request accepted" }, status: :ok
      else
        render json: { errors: @request.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { message: "Invalid request status" }, status: :unprocessable_entity
    end
  end

  # PATCH /requests/:id/reject
  def reject
      case @request.status
      when 'rejected'
        render json: { message: "Request is already rejected" }, status: :unprocessable_entity
      when 'accepted'
        render json: { message: "Request was accepted earlier, cannot reject" }, status: :unprocessable_entity
      when 'pending'
          if @request.update(status: 'rejected')
            render json: { message: "Request rejected" }, status: :ok
          else
            render json: { errors: @request.errors.full_messages }, status: :unprocessable_entity
          end
      else
        render json: { message: "Invalid request status" }, status: :unprocessable_entity
      end
  end
def update
  @request = Request.find_by(id:params[:id])
  if @request.update(request_params)
    render json: @request.as_json(include: { product: { only: [:id, :pname, :price, :image_url, :category, :description] } })
  else
    render json: { errors: @request.errors.full_messages }, status: :unprocessable_entity
  end
end

# DELETE /requests/:id
def destroy
  @request = current_user.requests.find_by(id: params[:id])

  if @request.nil?
    render json: { error: "Request not found or not authorized" }, status: :not_found
  elsif @request.status != 'pending'
    render json: { error: "Only pending requests can be deleted" }, status: :unprocessable_entity
  elsif @request.destroy
    render json: { message: "Request deleted successfully" }, status: :ok
  else
    render json: { errors: @request.errors.full_messages }, status: :unprocessable_entity
  end

  def accept_reject
   if @request.nil?
    render json: { error: "Request not found or not authorized" }, status: :not_found
  elsif @request.status != 'pending'
    render json: @request.as_json(include: { product: { only: [:id, :pname, :price, :image_url, :category, :description] } })

  
  else
    render json: { errors: @request.errors.full_messages }, status: :unprocessable_entity
  end

  end
end

  

  private

  def request_params
    params.require(:request).permit( :requested_price)
  end

  def set_request
    @request = Request.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Request not found" }, status: :not_found
  end

  def check_product_owner
    unless @request.product.user_id == current_user.id
      render json: { error: "Not authorized" }, status: :forbidden
    end
  end

  def authorize_user
    render json: { error: "Not authorized" }, status: :unauthorized unless current_user
  end
end
