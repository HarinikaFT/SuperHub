Rails.application.routes.draw do
  # Users
  post '/signup', to: 'users#create'
  post '/login', to: 'users#login'
  delete '/logout', to: 'users#logout'
  get '/profile', to: 'users#show'
  patch '/profile', to: 'users#update'
   get '/my_products', to: 'products#my_products'
   get 'other_products',to:'products#other_products'
   get '/requested_products',to:'requests#requested_products'
    get '/my_requests',to:'requests#my_requests'
  get '/accept_reject',to:'requests#accept_reject'
  
  resources :requests, only: [:index, :show, :update, :destroy]
 resources :products do
  resources :requests, only: [:index, :create, :show] do
    member do
      patch 'accept'
      patch 'reject'
    end
  end
end




end
