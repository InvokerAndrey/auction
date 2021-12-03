terraform {
  required_providers {
    heroku = {
      source = "heroku/heroku"
      version = "4.7.0"
    }
  }
}

# Configure the Heroku provider
provider "heroku" {
  email   = "dydyshko1999@gmail.com"
  api_key = "3e3416a6-2ff0-4f57-a9d8-35ce794d5258"
}

# Create a new application
resource "heroku_app" "default" {
  name = "english-dutch-auction-api"
  region = "eu"

  config_vars = {
      DEBUG_COLLECTSTATIC = "1"
      DJANGO_SETTINGS_MODULE = "backend.settings.production"
  }

  buildpacks = [
    "heroku/python",
    "https://github.com/moneymeets/python-poetry-buildpack.git"
  ]
}

resource "heroku_addon" "database" {
  app  = heroku_app.default.name
  plan = "heroku-postgresql:hobby-dev"
}

resource "heroku_addon" "redis" {
  app  = heroku_app.default.name
  plan = "heroku-redis:hobby-dev"
}

resource "heroku_addon" "cloudinary" {
  app  = heroku_app.default.name
  plan = "cloudinary:starter"
}

output "example_app_url" {
  value = "https://${heroku_app.default.name}.herokuapp.com"
}