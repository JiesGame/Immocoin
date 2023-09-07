class PropertiesController < ApplicationController
  before_action :set_property, only: %i[ show  destroy ]
  before_action :authenticate_user!, only: %i[ create update destroy ]

  # GET /properties
  def index
    @properties = Property.all

    render json: @properties, include: [:user, :featured_image]
  end

  # GET /properties/1
  def show
    render json: @property, include: [:user, :featured_image]
  end

  # POST /properties
  def create
    @property = Property.new(property_params.merge(user_id: current_user.id))
    if @property.save
      render json: @property, status: :created, location: @property
    else
      render json: @property.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /properties/1
  def update
    @property = Property.find(params[:id])
    if @property.user.id == current_user.id
      if @property.update(property_params.merge(user_id: @property.user.id))
        render json: @property
      else
        render json: @property.errors, status: :unprocessable_entity
      end
    else
      render json: { error: "Vous ne pouvez pas mettre à jour cette vente." }, status: :unprocessable_entity
    end 
  end

  # DELETE /properties/1
  def destroy
    if @property.user.id == current_user.id
      @property.destroy
    else
      render json: { error: "Vous ne pouvez pas supprimer cette vente." }, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_property
      @property = Property.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def property_params
      params.require(:property).permit(:title, :price, :description, :featured_image)
    end

    def get_user_from_token
      jwt_payload = JWT.decode(request.headers['Authorization'].split(' ')[1],
                               Rails.application.credentials.devise[:jwt_secret_key]).first
      user_id = jwt_payload['sub']
      User.find(user_id.to_s)
    end
end
