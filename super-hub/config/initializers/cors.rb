Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'  # React frontend URL, change if needed

    resource '*',
      headers: :any,
      methods: [:get, :post, :patch, :put, :delete, :options, :head],
      expose: ['Authorization'] 
  end
end
