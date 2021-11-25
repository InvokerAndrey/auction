command:
	docker run --rm backend_web
	docker exec -ti backend_web_1 bash

up_web:
	docker-compose up --build web

up_celery:
	docker-compose up --build celery

celery:
	celery -A backend worker -l INFO
