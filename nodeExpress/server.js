var express = require('express');

//var morgan = require('morgan');
var bodyParser = require('body-parser');
var db = require('./mongoose');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var router = express.Router();

router.use(function(req, res, next) {
    console.log('Request:'+ req.url);
    next();
});

router.get('/restapi', function (req, res) {
    var usage = '<html><head></head><body><ul>'+
    '<li>GET /restapi/country - countries list</li>'+
    '<li>GET /restapi/country/:name/hotel - hotels in country</li>'+
    '<li>POST /country - add country</li>'+
    '<li>POST /country/:name/hotel/ - add hotel</li>'+
    '<li>DELETE /hotel/:nameHotel/ - delete hotel</li>'+
    '<li>GET /hotel/:nameHotel - get hotel</li>'+
    '<li>PUT /hotel/nameHotel - update hotel</li>'+
    '</ul></body></html>';
    res.send(usage);
});

router.get('/restapi/country', function (req, res) {
    db.Country.find({}).select('country').exec(function(err, data) {
    if (err) {console.error(err);}
    res.json(data);
    });
});

router.get('/restapi/country/:name/hotel', function (req, res) {
    var country = req.params.name;
    db.Hotel.find({'hotelCountry': country}).select('hotelName').exec(function(err, data) {
    if (err) {console.error(err);}
    res.json(data);
    });
});

router.post('/restapi/country', function (req, res) {
    var post = new db.Country({
    country: req.body.country,
    description: req.body.description
    });
    post.save();
    res.send('Country ' + req.body.country + ' added');
});

router.post('/restapi/country/:name/hotel', function (req, res) {
    var country = req.params.name;
    var post = new db.Hotel({
    hotelName: req.body.hotelName,
    hotelCountry: country,
    hotelDescriotion: req.body.hotelDescriotion
    });
    post.save();
    res.send('Hotel ' + req.body.hotelName + ' added');
});

router.get('/restapi/hotel/:nameHotel', function (req, res) {
    var hotel = req.params.nameHotel;
    db.Hotel.findOne({"hotelName":hotel}).select("hotelDescriotion").exec(function(err, data) {
    if (err) {console.error(err);}
    res.json(data);
    });
});

router.put('/restapi/hotel/:nameHotel', function (req, res) {
    var hotel = req.params.nameHotel;
    var hotelDescriotion = req.body.hotelDescriotion;
    db.Hotel.findOne({"hotelName":hotel}, function(err, data) {
        data.hotelDescriotion = hotelDescriotion;
        data.save();
        res.send('Hotel description for ' + hotel + ' upated');
    });
});

router.delete('/restapi/hotel/:nameHotel', function (req, res) {
    var hotel = req.params.nameHotel;
    db.Hotel.findOne({"hotelName":hotel}).remove().exec(function(err, data) {
    if (err) {console.error(err);}
    res.send('Hotel ' + hotel + ' deleted');
    });
});

app.use(router);
app.listen(8888);