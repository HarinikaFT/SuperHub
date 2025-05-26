class ProductsController < ApplicationController
  before_action :authorize_user, except: [:index, :show,:other_products]
  before_action :set_product, only: [:show, :edit, :update, :destroy]
  before_action :check_owner, only: [:edit, :update, :destroy]
 



  def index
    @products = Product.all

    @products = Product.where(category: params[:category]) if params[:category].present? && params[:category] != "All"

    if params[:search_term].present?
      term = params[:search_term].strip.downcase
      @products = Product.where("LOWER(pname) LIKE ? OR LOWER(category) LIKE ?", "%#{term}%", "%#{term}%")
    end
       if params[:price_range].present? && params[:price_range] != "All"
      case params[:price_range]
      when "99-999"
        @products = Product.where(price: 99..999)
      when "1000-9999"
        @products = Product.where(price: 1000..9999)
      when "10000-99999"
        @products = Product.where(price: 10000..99999)
      when "100000-999999"
        @products = Product.where(price: 100000..999999)
      when "1000000+"
        @products = Product.where("price > ?", 1_000_000)
      end
    end

    render json: @products.as_json(methods: [:image_url])
  end
 def other_products
  if current_user
    @products = Product.where.not(user_id: current_user.id)
  else
    @products = Product.all
  end

  render json: @products.as_json(methods: [:image_url])
rescue => e
  render json: { error: e.message }, status: :internal_server_error
end

  def show
    render json: @product.as_json(methods: [:image_url])
  end

  def create
    @product = current_user.products.build(product_params)
    if @product.save
      render json: @product, status: :created
    else
      render json: { errors: @product.errors.full_messages }, status: :unprocessable_entity
    end
  end

 
  def edit
    render json: @product
  end

  def update
    if @product.update(product_params)
      render json: @product.as_json(methods: [:image_url])
    else
      render json: { errors: @product.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /products/:id
  def destroy
    @product.destroy
    head :no_content
  end
  def my_products
  begin
    @products = current_user.products
    render json: @products.as_json(methods: [:image_url])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "User or products not found" }, status: :not_found
  end
end


  private

  def product_params
    params.permit(:pname, :category, :price, :description,:image)
  end


  def set_product
    @product = Product.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Product not found" }, status: :not_found
  end

  def check_owner
    unless @product.user_id == current_user.id
      render json: { error: "Not authorized" }, status: :forbidden
    end
  end
  


end
