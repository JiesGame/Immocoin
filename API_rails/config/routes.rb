Rails.application.routes.draw do
  resources :properties
  devise_for :users,
             controllers: {
               sessions: 'users/sessions',
               registrations: 'users/registrations'
             }
  get '/member-data', to: 'members#show'
  resources :users
  post 'password/forgot', to: 'password#forgot'
  put 'password/reset/:token', to: 'password#reset'
end
