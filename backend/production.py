from .settings import *
import dj_database_url


DEBUG = False

ALLOWED_HOSTS = ['english-dutch-auction.herokuapp.com', 'english-dutch-auction-api.herokuapp.com']

CORS_ALLOWED_ORIGINS = ['https://english-dutch-auction.herokuapp.com']

# Configure database from DATABASE_URL
DATABASES['default'] = dj_database_url.config(conn_max_age=600, ssl_require=True)

STATICFILES_STORAGE = 'whitenoise.storage.CompressedStaticFilesStorage'

CLOUDINARY_STORAGE = {
    'CLOUD_NAME': 'hicl18kdd',
    'API_KEY': '876195899135744',
    'API_SECRET': 'kVHVUeF0rMgYFR0vSIvAL2c_SN8'
}