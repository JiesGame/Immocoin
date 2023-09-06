class PasswordController < ApplicationController
  def forgot
    if params[:email].blank?
      return render json: {error: "L'adresse mail n'est pas renseignée."}
    end

    @user = User.find_by(email: params[:email])

    if @user.present?
      @user.generate_password_token!
      reset_password_url = "http://localhost:5173/reset_password/#{@user.reset_password_token}"
      UserMailer.password_reset(@user, reset_password_url).deliver_now
      render json: {status: 'Email envoyé.'}, status: :ok
    else
      render json: {error: ["Cette adresse mail n'a pas été trouvée. Essayer encore."]}, status: :not_found
    end
  end

  def reset
    token = params[:token].to_s
    if params[:token].blank?
      return render json: {error: "Le jeton n'est pas présent."}
    end

    user = User.find_by(reset_password_token: token)

    if user.present? && user.password_token_valid?
      if user.reset_password!(params[:password])
        render json: {status: 'ok'}, status: :ok
      else
        render json: {error: user.errors.full_messages}, status: :unprocessable_entity
      end
    else
      render json: {error:  ["Le lien n'est pas valide ou est expiré. Merci de générer un nouveau lien."]}, status: :not_found
    end
  end
end
