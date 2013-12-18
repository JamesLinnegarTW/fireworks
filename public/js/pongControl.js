// Client
$(function(){

    var socket = io.connect(
        'http://'+window.location.hostname+':9000/'
    );

    socket.on('connect', function () {
        socket.emit('user', {});  

        document.addEventListener('touchstart', function (e) {   
            e.preventDefault(); 
        }, false);

        document.addEventListener('touchmove', function (e) { 	

			e.preventDefault(); 

            var data = {};

            var y = (e.touches[0].clientY / window.innerHeight);
            data.y = y;
            socket.emit('moveUser', data);          

		}, false);


        socket.on('color', function (data) {
            $('html').css("backgroundColor", "rgb(" + data.r + "," + data.g + "," + data.b + ")" );
        });
	});
   

});