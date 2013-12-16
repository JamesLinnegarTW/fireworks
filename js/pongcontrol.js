// Client
$(function(){
    
    var socket = io.connect(
        'http://'+window.location.hostname+':9000/'
    );

    socket.on('connect', function () {
    
        var x, y;

        var color = {
                r : Math.round(Math.random()*255),
                g : Math.round(Math.random()*255),
                b : Math.round(Math.random()*255)
            };


        document.addEventListener('touchstart', function (e) {   
            
            color = {
                r : Math.round(Math.random()*255),
                g : Math.round(Math.random()*255),
                b : Math.round(Math.random()*255)
            };

        }, false);

        document.addEventListener('touchmove', function (e) { 	
			
			y = e.touches[0].clientY / window.innerHeight;
			x = e.touches[0].clientX /  window.innerWidth;


			e.preventDefault(); 

			socket.emit('move', {
                'y':y,
                'x':x,
                'color':color
            });
            

		}, false);


        document.addEventListener('touchend', function (e) {  

            socket.emit('bang', {
                'y':y,
                'x':x,
                'color':color
            });

        }, false);        
  
   
        socket.emit('join-control', {
            controller_id: 'hello'
        });   

	});

});