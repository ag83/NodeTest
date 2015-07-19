/**
 * RestapiController
 *
 * @description :: Server-side logic for managing restapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	getCountries: function(req, res) {
        countries.find({}, {select: ['country']}).exec(function(err, data){
            if (err) {console.error(err);}
            return res.json(data);
        });      
    },

    getCountryHotels: function(req, res) {
        var cntr = req.param('name');
        countries.find({country: cntr})
        .populate('hotels', {select: ['hotelName']})
        .exec(function(err, data){
            if (err) {console.error(err);}
            if (data.length == 0) {
                return res.view('404explain', {message: 'Country ' + cntr + ' have not hotels.'});
            } else {
                return res.json(data[0].hotels);
            }
        });      
    },

    addCountry: function(req, res) {
        countries.create({country: req.body.country,
                          description: req.body.description})
        .exec(function(err, data){
            if (err) {console.error(err);}
            return res.send('Country ' + req.body.country + ' added');
        });      
    },

    addHotel: function(req, res) {
        var cntr = req.param('name');
        hotels.create({hotelName: req.body.hotelName,
                        hotelCountry: cntr,
                        hotelDescriotion: req.body.hotelDescriotion})
        .exec(function(err, data){
            if (err) {console.error(err);}
            return res.send('Hotel ' + req.body.hotelName + ' added');
        });      
    },

    getHotel: function(req, res) {
        var hotel = req.param('hotelName');
        hotels.find({hotelName: hotel}, {select: ['hotelDescriotion']}).exec(function(err, data){
            if (err) {console.error(err);}
            if (data.length == 0){
                console.log(hotel + 'not found')
                return res.view('404explain', {message: 'Hotel ' + hotel + ' is not exist in database.'});
            };
            return res.json(data);
        });      
    },

    updateHotel: function(req, res) {
        var hotel = req.param('hotelName');
        hotels.find({hotelName: hotel}, {select: ['hotelDescriotion']}).exec(function(err, data){
            if (err) {console.error(err);}
            if (data.length == 0){
                console.log(hotel + 'not found')
                return res.view('404explain', {message: 'Hotel ' + hotel + ' is not exist in database.'});        
        } else { hotels.update({hotelName: hotel}, {hotelDescriotion: req.body.hotelDescriotion}).exec(function(err, data){
                 if (err) {console.error(err);}
                 return res.send('Hotel ' + hotel + ' updated');
                });
            }
        });      
    },

    deleteHotel: function(req, res) {
        var hotel = req.param('hotelName');
        hotels.find({hotelName: hotel}, {select: ['hotelDescriotion']}).exec(function(err, data){
            if (err) {console.error(err);}
            if (data.length == 0){
                console.log(hotel + 'not found')
                return res.view('404explain', {message: 'Hotel ' + hotel + ' is not exist in database.'});        
        } else { hotels.destroy({hotelName: hotel}).exec(function(err, data){
                 if (err) {console.error(err);}
                 return res.send('Hotel ' + hotel + ' deleted');
                 });
            }
        });      
    },


    notFound: function(req, res) {
        return res.view('404');
    }

};

