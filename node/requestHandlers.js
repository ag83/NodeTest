var db = require('./mongoose');
var url = require('url');

function start(request, response) {
  var usage = 
    'GET /restapi/country - countries list\n'+
    'GET /restapi/country/:name/hotel - hotels in country\n'+
    'POST /country - add country\n'+
    'POST /country/:name/hotel/ - add hotel\n'+
    'DELETE /hotel/:nameHotel/ - delete hotel\n'+
    'GET /hotel/:nameHotel - get hotel\n'+
    'PUT /hotel/nameHotel - update hotel\n';
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write(usage);
  response.end();
}

function countryList(request, response) {
  db.Country.find({}).select('country').exec(function(err, data) {
    if (err) {
        console.error(err);
    }
    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(JSON.stringify(data));
    response.end();
  });
}

function countryAdd(request, response) {
  request.on('data', function(chunk) {
    var data = JSON.parse(chunk);
    var post = new db.Country(data);
    post.save();
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write('Saved to database');
    response.end();
  });
}

function countryHotels(request, response) {
  var countrySearch = url.parse(request.url).pathname.split('/')[3];
  db.Hotel.find({'hotelCountry':countrySearch}).select('hotelName').exec(function(err, data) {
    if (err) {
        console.error(err);
    }
    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(JSON.stringify(data));
    response.end();
  });
}

function countryHotelAdd(request, response) {
  var countryAdd = url.parse(request.url).pathname.split('/')[3];
  request.on('data', function(chunk) {
    var data = JSON.parse(chunk);
    data.hotelCountry = countryAdd;
    var post = new db.Hotel(data);
    post.save();
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write('Saved to database');
    response.end();
  });
}

function hotelGet(request, response) {
  var hotel = url.parse(request.url).pathname.split('/')[3];
  db.Hotel.findOne({"hotelName":hotel}).select("hotelDescriotion").exec(function(err, data) {
    if (err) {
        console.error(err);
    }
    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(JSON.stringify(data));
    response.end();
  });
}

function hotelUpdate(request, response) {
  var hotel = url.parse(request.url).pathname.split('/')[3];
  request.on('data', function(chunk) {
    var update = JSON.parse(chunk);
    db.Hotel.findOne({"hotelName":hotel}, function(err, data) {
        data.hotelDescriotion = update.hotelDescriotion;
        data.save();
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write('Saved to database');
        response.end();
    });
  });
}

function hotelDelete(request, response) {
  var hotel = url.parse(request.url).pathname.split('/')[3];
  db.Hotel.findOne({"hotelName":hotel}).remove().exec(function(err, data) {
    if (err) {
        console.error(err);
    }
    response.writeHead(200, {"Content-Type": "application/json"});
    response.write('Deleted: ' + hotel);
    response.end();
  });
}

function notExist(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write('Not implemented');
    response.end();
}


exports.start = start;
exports.countryList = countryList;
exports.countryHotels = countryHotels;
exports.countryAdd = countryAdd;
exports.countryHotelAdd = countryHotelAdd;
exports.hotelGet = hotelGet;
exports.hotelUpdate = hotelUpdate;
exports.hotelDelete = hotelDelete;
exports.notExist = notExist;


