Rails.application.routes.draw do
  devise_for :users,
             controllers: {
               sessions: 'users/sessions',
               registrations: 'users/registrations'
             }
  get '/member-data', to: 'members#show'
  resources :articles do
    resources :comments
  end
  resources :users
  post 'password/forgot', to: 'password#forgot'
  put 'password/reset/:token', to: 'password#reset'
  put 'password/update', to: 'password#update'
end
