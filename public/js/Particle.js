	function Particle(x, y, color, particleSize, bang, direction, color)
	{
		var distance = (Math.random() * bang);
		var startTime = new Date();
		var speed = {x: (-distance+Math.random()*(2 * distance)), 
					 y: (-distance+Math.random()*(2 * distance) - (distance/2)) };
				
		var location = {x: x, y: y};
	
		var radius = 10+Math.random()*(particleSize);
	
		var life = 100+Math.random()*10;
		var remaining_life = life;
	
		this.r = color.r; 
		this.g = color.g; 
		this.b = color.b;

		this.draw = function(ctx){
			var delta = (new Date() - (startTime || new Date())) / 50;

			ctx.beginPath();
			opacity = Math.round(remaining_life/life*100)/100
		
			var gradient = ctx.createRadialGradient(location.x, location.y, 0, location.x, location.y, radius);
			gradient.addColorStop(0, "rgba("+this.r+", "+this.g+", "+this.b+", "+opacity+")");
			gradient.addColorStop(0.5, "rgba("+this.r+", "+this.g+", "+this.b+", "+opacity+")");
			gradient.addColorStop(1, "rgba("+this.r+", "+this.g+", "+this.b+", 0)");
		
			ctx.fillStyle = gradient;
			ctx.arc(location.x, location.y, radius, Math.PI*2, false);
			ctx.fill();
	
			remaining_life = remaining_life - (1 * delta);
			radius = radius - (1 * delta);
			
			location.x += (speed.x * delta);
			location.y += (speed.y * delta);
			
			if(location.y > window.H){
				location.y = window.H;
				speed.y = -(speed.y *0.6);
			}
			if(location.x > window.W){
				location.x = window.W;
				speed.x = -(speed.x *0.6);
			}
			if(location.y < 0){
				location.y = 0;
				speed.y = -(speed.y *0.6);
			}
			if(location.x < 0){
				location.x = 0;
				speed.x = -(speed.x *0.6);
			}
			
			speed.y = speed.y + (0.6 * delta);
			speed.x = speed.x + (direction * delta);
			startTime = new Date();
			if((remaining_life < 0 || radius < 0) ) {
				return false; //kill the particle
			} else {
				return true;
			}
		};
	}
	