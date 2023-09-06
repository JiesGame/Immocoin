Rails.application.routes.draw do
  resources :properties
  devise_for :users,
             controllers: {
               sessions: 'users/sessions',
               registrations: 'users/registrations'
             }
  get '/member-data', to: 'members#show'
  resources :users, :except => [:destroy]
  post 'users/destroy_with_password', to: "users#destroy_with_password"
  post 'password/forgot', to: 'password#forgot'
  put 'password/reset/:token', to: 'password#reset'
end
