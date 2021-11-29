command:
	docker run --rm auction-backend_web
	docker exec -ti auction-backend_web_1 bash

up_web:
	docker-compose up --build web

up_celery:
	docker-compose up --build celery

celery:
	celery -A backend worker -l INFO
