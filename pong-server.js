var io = require('socket.io').listen(9000);
io.set('log level', 2);


// Import external files
var fs = require('fs');
var vm = require('vm');
var includeInThisContext = function(path) {
    var code = fs.readFileSync(path);
    vm.runInThisContext(code, path);
}.bind(this);

includeInThisContext('./public/js/underscore.js');


var clients = [];
var paddles = [];
var users = [];

var static = require('node-static');
var file = new static.Server('./public');
var ball = {x: 0.5,y:0.0};
var speedY = 0.005;
var speedX = -0.005;

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(8081);

function randomColor(){
    return {
        r: Math.round((Math.random() * 255)),
        g: Math.round((Math.random() * 255)),
        b: Math.round((Math.random() * 255))
    }
}
io.sockets.on('connection', function (socket) {
    clients.push(socket);

    

    socket.on('user', function(){
        users.push(socket);
        var color = randomColor();
        socket.emit('color',color)
        paddles[socket.id] = {u: new Date(), y:0.5, side: ((users.length-1) % 2), color:color};
        for(var i= 0; i < clients.length; i++) {
            clients[i].emit('newUser', paddles[socket.id]);
        }
    });

    socket.on('moveUser', function(data){
        var y = data.y;
        
        var paddle = paddles[socket.id];
        paddle.y = y;
        paddles[socket.id] = paddle;
        for(var i = 0; i < clients.length; i++) {
            clients[i].emit('moveUser', paddle);
        }
    });
    
    socket.on('disconnect', function(){
        for(var i= 0; i < clients.length; i++) {
            if(clients[i].id == socket.id){
                clients.splice(i,1);
                break;                
            }
        }
        for(var i= 0; i < users.length; i++) {
            if(users[i].id == socket.id){
                users.splice(i,1);
                var paddle = paddles[socket.id];

                for(var i= 0; i < clients.length; i++) {
                    clients[i].emit('removeUser', paddle);
                }

                break;                
            }
        }
    });

    function updateUserList(){
        socket.emit.broadcast('updateUsers', users);
    }

});

function collisionDetect(side){

   var keys = Object.keys(paddles);
   var paddle;
    for(var i = 0; i < keys.length; i++){
        paddle = paddles[keys[i]];

        if(ball.y >= (paddle.y - 0.1) &&
           ball.y <= (paddle.y + 0.1) &&
           paddle.side == side) {
           return paddle.color;
        }
    }
    return false;
}

setInterval(function(){
    ball.x = ball.x + speedX;
    ball.y = ball.y + speedY;

    if(ball.y < 0) {
        speedY = -speedY;
    }

    if(ball.y > 1){
        speedY = -speedY;
    }

    if(ball.x <= 0){
        var collision = collisionDetect(0);

        if(collision){
            speedX = (-speedX) + 0.001;
            for(var i= 0; i < clients.length; i++) {
                clients[i].emit('c', collision);
            }  
        } else {
                       
            for(var i= 0; i < clients.length; i++) {
                clients[i].emit('b', {x:ball.x, y:ball.y});
            }

            speedX = 0.001;
            
            if(Math.random() > 0.5) speedX = -speedX;

            ball.x = 0.5;
            ball.y = Math.random();
        }
        
    }
    
    if(ball.x >= 1) {

        var collision = collisionDetect(1);

        if(collision){
            speedX = (-speedX) * 1.01;
            for(var i= 0; i < clients.length; i++) {
                clients[i].emit('c', collision);
            }  
        } else {
                       
            for(var i= 0; i < clients.length; i++) {
                clients[i].emit('b', {x:ball.x, y:ball.y});
            }
            speedX = -0.001;
            ball.x = 0.5;
            ball.y = Math.random();
        }

    }

    for(var i= 0; i < clients.length; i++) {
        clients[i].emit('ball', ball);
    }
},10);
