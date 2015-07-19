
module.exports = {

  attributes: {

    hotelName:{
        type: 'string',
        minLength: 2
    },

    hotelDescriotion:{
        type: 'text'
    },

    hotelCountry:{
        model: 'countries'
    }

  }
};