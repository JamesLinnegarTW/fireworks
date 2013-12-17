// Client
$(function(){
    $("#color").spectrum({
        color: "#f00"
    });

    $("#color2").spectrum({
        color: "#f00"
    });

    var socket = io.connect(
        'http://'+window.location.hostname+':9000/'
    );

    socket.on('connect', function () {
        var x, y, direction = {x:0,y:0};
        var drawable = document.getElementById('draw');

        drawable.addEventListener('touchstart', function (e) {   

            e.preventDefault(); 
            for(var i = 0; i < e.touches.length; i++){
                socket.emit('move', {
                    'y':e.touches[i].clientY / window.innerHeight,
                    'x':e.touches[i].clientX /  window.innerWidth,
                    'colors':[ $("#color").spectrum("get").toRgb(),
                               $("#color2").spectrum("get").toRgb() ]
                });
            }

        }, false);

        drawable.addEventListener('touchmove', function (e) { 	

			e.preventDefault(); 
            for(var i = 0; i < e.touches.length; i++){
    			socket.emit('move', {
                    'y':e.touches[i].clientY / window.innerHeight,
                    'x':e.touches[i].clientX /  window.innerWidth,
                    'colors':[ $("#color").spectrum("get").toRgb(),
                               $("#color2").spectrum("get").toRgb() ]
                });
            }            

		}, false);


        document.addEventListener('touchend', function (e) {  
            for(var i= 0; i< e.changedTouches.length; i++){
                socket.emit('bang', {
                    'y':(e.changedTouches[i].clientY/  window.innerHeight),
                    'x':(e.changedTouches[i].clientX/  window.innerWidth),
                    'colors':[ $("#color").spectrum("get").toRgb(),
                               $("#color2").spectrum("get").toRgb()
                            ],
                    'bang': $('#bang').val()/10
                });
            }
        }, false);        
    

	});

});