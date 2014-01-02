// Client

function randomColor(){
    return {
        r: Math.round((Math.random() * 255)),
        g: Math.round((Math.random() * 255)),
        b: Math.round((Math.random() * 255))
    }
}

$(function(){

    var socket = io.connect(
        'http://'+window.location.hostname+':9000/'
    );

    socket.on('connect', function () {
        var x, y, direction = {x:0,y:0};
        var drawable = document.getElementById('draw');

        drawable.addEventListener('touchstart', function (e) {   
            e.preventDefault(); 
        }, false);

        drawable.addEventListener('touchmove', function (e) { 	

			e.preventDefault(); 

            var data = {f:[]};

            for(var i= 0; i< e.changedTouches.length; i++){
                var y = (e.touches[i].clientY / window.innerHeight);
                var x = (e.touches[i].clientX /  window.innerWidth);
                data.f.push({
                    'y': y.toFixed(2),
                    'x': x.toFixed(2),
                    'c':[ randomColor(),
                          randomColor()
                        ]
                });

                window.trails.push(new Trail(e.touches[i].clientX, e.touches[i].clientY, randomColor()));
            }
            socket.emit('m', data);          

		}, false);


        drawable.addEventListener('touchend', function (e) {  
            var data = {f:[]};

            for(var i= 0; i< e.changedTouches.length; i++){
                data.f.push({
                    'y':(e.changedTouches[i].clientY / window.innerHeight).toFixed(2),
                    'x':(e.changedTouches[i].clientX / window.innerWidth).toFixed(2),
                    'c':[ randomColor(),
                        randomColor()
                            ],
                    'bang': 0.7
                });

                window.fireworks.push(new Firework(e.changedTouches[i].clientX, e.changedTouches[i].clientY, 7, randomColor()));
            }
            socket.emit('b', data);
        }, false);        
    

	});

});