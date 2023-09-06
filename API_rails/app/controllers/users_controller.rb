class UsersController < ApplicationController
  before_action :set_user, only: %i[ show update destroy ]
  before_action :authenticate_user!, only: %i[ create update destroy ]

  # GET /users
  def index
    @users = User.all
    render json: @users
  end

  # GET /users/1
  def show
    if @user == get_user_from_token
      render json: @user, include: :properties
    else
      render json: { error: "Vous ne pouvez voir que votre profil."}
    end
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    update_params = user_params.except(:current_password)
    update_params.delete(:password) if user_params[:password].blank?
    update_params.delete(:email) if user_params[:email].blank?
    
    if @user == get_user_from_token
      if @user.valid_password?(user_params[:current_password])
        if @user.update(update_params)
          render json: @user
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      else
        render json: { error: "Le mot de passe est incorrect." }, status: :unprocessable_entity
      end
    else
      render json: { error: "Vous pouvez uniquement mettre à jour votre profil." }, status: :unprocessable_entity
    end
  end

  # DELETE /users/destroy_with_password
  def destroy_with_password
    if current_user.valid_password?(params[:data][:current_password])
      current_user.destroy
      sign_out(current_user)
      render json: {error: "Le compte a été supprimé !"}, status: :ok
    else
      render json: { error: "Le mot de passe est incorrect." }, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:email, :password, :current_password)
    end

    def get_user_from_token
      jwt_payload = JWT.decode(request.headers['Authorization'].split(' ')[1],
                               Rails.application.credentials.devise[:jwt_secret_key]).first
      user_id = jwt_payload['sub']
      User.find(user_id.to_s)
    end
end