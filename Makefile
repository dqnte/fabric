up:
	docker compose up --build

down:
	docker compose down --remove-orphans

db-exec:
	docker exec -it fabric-database bash

db-conn:
	psql -U postgres -h localhost -d main

server-exec:
	docker exec -it fabric-server bash
