from .base import *


DEBUG = False

ALLOWED_HOSTS = ['https://english-dutch-auction-api.herokuapp.com/']

CORS_ALLOWED_ORIGINS = ['https://english-dutch-auction.herokuapp.com/']

STATICFILES_STORAGE = 'whitenoise.storage.CompressedStaticFilesStorage'

CLOUDINARY_STORAGE = {
    'CLOUD_NAME': 'hicl18kdd',
    'API_KEY': '876195899135744',
    'API_SECRET': 'kVHVUeF0rMgYFR0vSIvAL2c_SN8'
}