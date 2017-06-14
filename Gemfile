source 'https://rubygems.org'

gem 'rails', '5.1.0.rc1'
gem 'webpacker', github: 'rails/webpacker'
gem 'pg', '~> 0.18'
gem 'puma', '~> 3.0'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.2'

gem 'jquery-rails'
gem 'jbuilder', '~> 2.5'
# START:install-faker
gem 'devise'
# START_HIGHLIGHT
gem 'faker'
# END_HIGHLIGHT
# END:install-faker
# END:install-webpack-rails
# END:install-devise

# START:install-poltergeist
# START:install-database_cleaner
group :development, :test do

  # other gems...

# END:install-database_cleaner
  gem 'rspec-rails'
  # START_HIGHLIGHT
  gem 'poltergeist'
  # END_HIGHLIGHT
# END:install-poltergeist
# START:install-database_cleaner
  gem 'database_cleaner'
# END:install-database_cleaner
  gem 'factory_girl_rails'
# START:install-poltergeist
# START:install-database_cleaner
end
# END:install-database_cleaner
# END:install-poltergeist

group :development do
  gem 'listen', '~> 3.0.5'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

gem 'foreman'
