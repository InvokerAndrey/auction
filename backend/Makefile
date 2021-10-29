command:
	docker run --rm backend_web
	docker exec -ti backend_web_1 bash

up web:
	docker-compose up --build web

up celery:
	docker-compose up --build celery

celery:
	celery -A backend worker -l INFO