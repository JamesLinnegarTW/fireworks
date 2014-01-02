		function Trail(x, y, color){
			var bang = 5;
			var particles = [];
			this.color = color;

			var particleSize = Math.random() * 5;
			
			var direction = (Math.random() / 2);
			
			for(var i = 0; i < Math.round(Math.random()*10);i++){
				particles.push(new Particle(x, y, color, particleSize, bang, direction, this.color));
			}		
		
			this.draw = function(ctx){
				for(var i = 0; i < particles.length; i++){
					if(!particles[i].draw(ctx)){
						particles.splice(i,1);
						i--;
					}
				}
				return (particles.length > 0);
			};
		};