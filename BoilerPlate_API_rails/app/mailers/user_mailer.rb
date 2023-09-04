class UserMailer < ApplicationMailer
  default from: "from@example.com"

  def password_reset(user, reset_password_url)
      @user = user
      @url = reset_password_url
      mail(to: @user.email, subject: 'Réinitialisation de votre mot de passe')
  end
end
