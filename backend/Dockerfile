FROM python:3.9

WORKDIR /backend

# set env variables
ENV POETRY_VERSION=1.0.0

# install poetry
RUN pip install "poetry==$POETRY_VERSION"


RUN poetry config virtualenvs.create false

# copy poetry.lock
COPY pyproject.toml poetry.lock ./

RUN poetry install

# step install poetry

# copy project

COPY . /backend

# run command / entrypoint

WORKDIR /backend
