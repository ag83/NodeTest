var http = require('http');
var router = require('./router');

function start(route) {
  function onRequest(request, response) {
    route(request, response);
  }

  http.createServer(onRequest).listen(8888);
  console.log('Server start.');
}

start(router.route);