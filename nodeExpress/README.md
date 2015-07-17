Test database:
mongoimport --db nodeTest --collection hotels --file ./db/hotels.json
mongoimport --db nodeTest --collection countries --file ./db/countries.json

Server start:
node server.js

Avialable:
http://localhost:8888

Versions:
Node: 0.10.25
mongoose: 4.0.7
express:4.13.1

API:
    GET /restapi - this message
    GET /restapi/country - countries list
    GET /restapi/country/:nameCountry/hotel - hotels in country
    POST /country - add country
    POST /country/:nameCountry/hotel/ - add hotel
    DELETE /hotel/:nameHotel/ - delete hotel
    GET /hotel/:nameHotel - get hotel
    PUT /hotel/:nameHotel - update hotel

Test requests:

POST /country
curl -H "Content-Type: application/json" -X POST -d '{"country":"Greece","description":"Greece description"}' http://localhost:8888/restapi/country/

POST /country/:name/hotel/
curl -H "Content-Type: application/json" -X POST -d '{"hotelName" : "NewHotel", "hotelDescriotion": "This is hotel at the sea"}' http://localhost:8888/restapi/country/Italy/hotel

PUT /hotel/nameHotel
curl -H "Content-Type: application/json" -X PUT -d '{"hotelDescriotion": "This is NewHotel"}' http://localhost:8888/restapi/hotel/NewHotel

DELETE /hotel/:nameHotel/ - delete hotel
curl -X DELETE http://localhost:8888/restapi/hotel/NewHotel
