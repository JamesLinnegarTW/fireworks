// Client
$(function(){
	
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

    // Get the username
    $('#submitbutton').click(function(e){

		if($('#username').val() != ""){
        	var controller_id = $('#username').val(); //Math.random()+'';
	        var mouseIsDown = false;
	        var mouseIsUp = true;
	        var socket = io.connect(
	            'http://'+window.location.hostname+':9000/'
	        );

	        socket.on('connect', function () {
            
	            var _emitControlEvent = function(socket, div, state, data) {
	                var type = $(div).data('type') ? $(div).data('type') : data.type;
	                var action = $(div).data('action') ? $(div).data('action') : data.action;

	                socket.emit('control', {
	                    type: type,
	                    action: action,
	                    state: state
	                });
	            }

	            // Move events
	            $('div[data-type=move]').bind("touchstart", function(event){
						event.preventDefault();
	                    _emitControlEvent(socket, this, 'start');                
	            }).bind('touchend', function(event) {
						event.preventDefault();
	                    _emitControlEvent(socket, this, 'stop');
	            });
          
            
	            // Shoot events
	            $('div[data-type=shoot]').bind("touchstart", function(event){
					event.preventDefault();
	                _emitControlEvent(socket, this, 'start');
	            }).bind('touchend', function() {
	                    _emitControlEvent(socket, this, 'stop');
	            });

	            // respawn
	            $('div[data-type=respawn]').bind('touchend', function(event) {
						event.preventDefault();
	                    _emitControlEvent(socket, this, 'stop');
	            });

	            socket.emit('join-control', {
	                controller_id: controller_id
	            });    
				socket.on('score', function(data){
					if(data.killed == controller_id){
						$('html').addClass('killed');
						setTimeout(function(){
							$('html').removeClass('killed');
						},2000);
					}
					 if(data.killer == controller_id){
					 	$('html').addClass('kill');
					 	setTimeout(function(){
					 		$('html').removeClass('kill');
					 	},2000);
					}
				})
	            $('#controller').show();
	$('#player').html(controller_id);
	  
	            $('#name').hide(); 
			
        	});
		} else {
			alert('Please enter a username.');
		}
    });
    
});