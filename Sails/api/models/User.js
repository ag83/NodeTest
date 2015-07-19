/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

//POST http://localhost:1337/rest/User/?name=Oleg&age=22
//GET http://localhost:1337/rest/User/Oleg
//PUT http://localhost:1337/rest/User/Oleg?age=24
//DELETE http://localhost:1337/rest/User/Oleg

module.exports = {

    autoPK: false,

    attributes: {
        name: {
            type: 'string',
            unique: true,
            primaryKey: true
        },

        age: {
            type: 'integer'
        }
    }

}

