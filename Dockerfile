FROM python:3.9.7

WORKDIR /backend

ENV POETRY_VERSION=1.0.0

RUN pip install "poetry==$POETRY_VERSION"

RUN poetry config virtualenvs.create false

COPY pyproject.toml poetry.lock ./

RUN poetry install

COPY . /backend

WORKDIR /backend

#CMD daphne -b 0.0.0.0 -p 8000 backend.asgi:application

