var io = require('socket.io').listen(9000);
var clients = [];
var static = require('node-static');
var file = new static.Server('./public');


require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(8080);


io.sockets.on('connection', function (socket) {
    socket.on('v', function(data){
        clients.push(socket);
    });

    socket.on('m', function(data) {
        for(var i= 0; i < clients.length; i++) {
            clients[i].emit('m', data);
        }
    });


    socket.on('b', function(data) {
        for(var i= 0; i < clients.length; i++) {
            clients[i].emit('b', data);
        }

    });

	socket.on('disconnect', function(){
        for(var i= 0; i < clients.length; i++) {
            if(clients[i].id == socket.id){
                clients.splice(i,1);
                break;                
            }
        }
	});

});