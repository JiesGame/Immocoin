class ApplicationController < ActionController::API
  before_action :configure_devise_parameters, if: :devise_controller?


  def configure_devise_parameters
    devise_parameter_sanitizer.permit(:sign_up) {|u| u.permit(:email, :password, :password_confirmation)}
    devise_parameter_sanitizer.permit(:sign_in) {|u| u.permit(:email, :password)}
  end
end
