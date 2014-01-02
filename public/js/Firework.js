function Firework(x, y, bang, color ){
	var particles = [];

	var particleSize = Math.round(Math.random()*15) + 5;
	
	var direction = (Math.random() / 2);
	this.color = color;

	if(Math.floor((Math.random()*2)-1) == 0){
		direction = -direction;
	}
	
	for(var i = particles.length; i < Math.random() * window.particle_count + 50; i++) {	
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