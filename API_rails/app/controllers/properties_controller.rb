class PropertiesController < ApplicationController
  before_action :set_property, only: %i[ show update destroy ]

  # GET /properties
  def index
    @properties = Property.all

    render json: @properties, include: :user
  end

  # GET /properties/1
  def show
    render json: @property, include: :user
  end

  # POST /properties
  def create
    @user = get_user_from_token
    @property = Property.new(property_params.merge(user_id: @user.id))

    if @property.save
      render json: @property, status: :created, location: @property
    else
      render json: @property.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /properties/1
  def update
    if @property.user.id == current_user.id
      if @property.update(property_params.merge(user_id: @article.user.id))
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
      params.require(:property).permit(:title, :price, :description)
    end

    def get_user_from_token
      jwt_payload = JWT.decode(request.headers['Authorization'].split(' ')[1],
                               Rails.application.credentials.devise[:jwt_secret_key]).first
      user_id = jwt_payload['sub']
      User.find(user_id.to_s)
    end
end
