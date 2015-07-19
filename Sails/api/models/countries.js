
module.exports = {
    
  autoPK: false,

  attributes: {

    country: {
        type: 'string',
        unique: true,
        primaryKey: true
    },

    countryDescription: {
        type: 'text'
    },

    hotels: {
        collection: 'hotels',
        via: 'hotelCountry'
    }

  }
};

