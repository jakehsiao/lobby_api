curl -X GET http://localhost:3050/rooms
curl -X POST -H "Content-Type:application/json" http://localhost:3050/create -d '{"player_id":"Hi again, World"}'
curl -X POST -H "Content-Type:application/json" http://localhost:3050/create -d '{"player_id":"Hi again, Yet another room"}'
curl -X GET http://localhost:3050/rooms
