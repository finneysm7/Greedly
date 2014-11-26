Rails.application.routes.draw do
  root to: 'static_pages#root'
  resources :users
  resource :session
  
  namespace :api, defaults: {format: :json} do
    resources :businesses, except: [:new, :edit]
    resources :articles, ony: [:create, :update, :destroy]
  end
end
