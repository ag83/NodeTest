var mongoose = require('mongoose');
var db = mongoose.connection;

db.on('error', console.error);
mongoose.connect('mongodb://localhost/nodeTest');
var conn = mongoose.connection;

var countrySchema = new mongoose.Schema({
    country: String,
    description: String
});

var hotelSchema = new mongoose.Schema({
    hotelName: String,
    hotelCountry: String,
    hotelDescriotion: String
});

var Country = mongoose.model('Country', countrySchema);
var Hotel = mongoose.model('Hotel', hotelSchema);

exports.Country = Country;
exports.Hotel = Hotel;
exports.conn = conn;