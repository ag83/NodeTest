$(document).ready(function(){
    $('#chatting').hide();
    var name;
    var socket;
    $('#send-name').click(function() {
        name = $('#user-name').val() || 'Anonymous';
        $('#naming').hide();
        $('#user-name').val('');
        $('#chatting').show();
        socket = io.connect('http://localhost:8888');

        socket.on('connect', function(){ 
            console.log(name); 
            socket.emit('adduser', name);
        });
            
        socket.on('message', function(data) {
            $('#chat').append('<li class="chat-message">'
                               + data.user
                               + ': ' 
                               + data.text
                               + '</li>'
                               );
        });

        socket.on('join', function(data) {
            $('#chat').append('<li class="chat-message"> User '
                                 + data.name 
                                 + ' online at ' 
                                 + data.time 
                                 + '</li>'
                                 );
        });

        socket.on('left', function(data) {
            $('#chat').append('<li class="chat-message"> User ' 
                                + data.name 
                                + ' offline at ' 
                                + data.time 
                                + '</li>'
                                );
        });               

        socket.on('history', function(data) {
            for (var i=0; i<data.length; i++) {
                $('#chat').append('<li class="chat-message">' 
                                    + data[i].user 
                                    + ': ' 
                                    + data[i].text 
                                    + '</li>'
                                    );
            }
        });
                 

        $('#send-message').click(function() {    
            var data = { text: $('#user-message').val(),
                         user: name };
            socket.emit('message', data);
            $('#user-message').val('');
        });        
    });

});