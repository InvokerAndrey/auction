terraform {
  required_providers {
    heroku = {
      source = "heroku/heroku"
      version = "4.6.0"
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
  name = "english-dutch-auction"
  region = "eu"
}
