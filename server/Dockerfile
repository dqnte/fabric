FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .

# these are some dependencies for fast api's connection to a psql database
RUN apt-get update \
    && apt-get -y install libpq-dev gcc

RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

EXPOSE 8080

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
