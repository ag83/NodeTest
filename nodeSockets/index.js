var express = require('express');
var io = require('socket.io');
var app = express();
var server = app.listen(8888, function(){
  console.log('listening on :8888');
});
var io = io.listen(server);

app.use(express.static(__dirname + '/public'));
 
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

var messages = [];
io.on('connection', function (socket) {

    console.log('User connected');
    socket.emit('history', messages);

    socket.on('adduser', function(data){
        socket.username = data;
        var time = (new Date).toLocaleTimeString();
        io.sockets.emit('join', {name: socket.username, time: time});
    });

    socket.on('message', function (data) {
        io.sockets.emit('message', data);
        console.log(data);
        messages.push(data);
    });  

    socket.on('disconnect', function(){
        console.log('user disconnected');
        var time = (new Date).toLocaleTimeString();
        io.sockets.emit('left', {name: socket.username, time: time});
    });
});