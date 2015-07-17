var url = require('url');
var requestHandlers = require('./requestHandlers');

function route(request, response) {

  var pathname = url.parse(request.url).pathname;
  var method = request.method;
  switch(true){
    case RegExp('^/restapi($|/$)').test(pathname):
      if (method == 'GET') {
        requestHandlers.start(request, response);
      } else {requestHandlers.notExist(request, response);}
      break;
    case RegExp('^/restapi/country($|/$)').test(pathname):
      if (method == 'GET') {
        requestHandlers.countryList(request, response);
      } else if (method == 'POST') {
        requestHandlers.countryAdd(request, response);
      } else {requestHandlers.notExist(request, response);}
      break;
    case RegExp('^/restapi/country/[a-zA-Z]+/hotel($|/$)').test(pathname):
      if (method == 'GET') {
        requestHandlers.countryHotels(request, response);
      } else if (method == 'POST') {
        requestHandlers.countryHotelAdd(request, response);
      } else {requestHandlers.notExist(request, response);}
      break;
    case RegExp('^/restapi/hotel/[a-zA-Z0-9_]+($|/$)').test(pathname):
      if (method == 'GET') {
        requestHandlers.hotelGet(request, response);
      } else if (method == 'PUT') {
        requestHandlers.hotelUpdate(request, response);
      } else if (method == 'DELETE') {
        requestHandlers.hotelDelete(request, response);
      } else {requestHandlers.notExist(request, response);}
      break;
    default:
      requestHandlers.notExist();
    }
}

exports.route = route;