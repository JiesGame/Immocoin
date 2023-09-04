class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    register_success && return if resource.persisted?

    register_failed
  end

  def register_success
    render json: {
      message: 'Votre compte a été créé.',
      user: current_user
    }, status: :ok
  end

  def register_failed
    render json: { message: "Votre compte n'a pas pu être créé." }, status: :unprocessable_entity
  end
end