var par;
var mouse_speed;
var give_speed = 0;
var give_angle = 0;
var shift = false;
var s_id = 1;
var color = new Color({hue: 360 * Math.random(), saturation: 1, brightness: 1});
var make;
var particles = [];
var g_constant = Math.pow(10, -0.5);

function Particle(center){
  this.speed = 0;
  this.angle = 0;
  this.initial_s = 0;
  this.initial_angle = 0;
  this.id = s_id;
  s_id += 1;
  this.center = center;
  this.mass = 0;
  this.actual = new Shape.Circle({
      center: this.center,
      radius: 0,
      fillColor: color,
      strokeColor: 'black'
  });

  this.calc_forces = function(){
    var force;
    var xforce = 0;
    var yforce = 0;
    var hypot;
    var angle;
    for(var i = 0; i < particles.length; i++){
      var other_par = particles[i];
      if(other_par.id === this.id){
        continue;
      };
      hypot = this.actual.position.getDistance(other_par.actual.position);
      angle = getAngle2(this.actual.position, other_par.actual.position);
      force = g_constant * this.mass * other_par.mass / Math.pow(hypot, 2);
      xforce += force * Math.cos(angle);
      yforce -= force * Math.sin(angle);
    };
    this.speed = Math.sqrt(Math.pow(xforce,2) + Math.pow(yforce,2)) / this.mass;
    this.angle =  Math.atan2(yforce, xforce);
    // this.actual.position += [xforce / this.mass, yforce / this.mass] + this.initial_v;
  };

  this.move = function(){
    this.calc_forces();
    console.log(this.id + "--- >> " + this.speed);
    this.actual.position += [(this.speed + this.initial_s) * Math.cos(this.angle + this.initial_angle), (this.initial_s + this.speed) * Math.sin(this.initial_angle + this.angle)];
  };

}; //Particle

function getQuadrant(p1, p2){
  if(p2.x > p1.x){
    if(p2.y < p1.y){
      return 1;
    }
    return 4;
  }
  if(p2.y < p1.y){
    return 2;
  }
  return 3;
};

function getAngle2(p1,p2){
  var quad = getQuadrant(p1, p2);
  var slope;
  if(p1.x == p2.x){
    if(p2.y < p1.y){
      return 90;
    }
    else {
      return 270;
    }
  }
  if(p2.x > p1.x){
    if(p2.y < p1.y){
      slope = -1 * (p2.y - p1.y) / (p2.x - p1.x);
      return Math.atan(slope);
    }
    else if (p2.y == p1.y) {
      return 0;
    }
    else if (p2.y > p1.y) {
      slope = (p2.y - p1.y) / (p2.x - p1.x);
      return 2*Math.PI - Math.atan(slope);
    }
  }
  if (p2.x < p1.x) {
    if(p2.y < p1.y){
      slope = -1 * (p2.y - p1.y) / (p2.x - p1.x);
      return Math.PI + Math.atan(slope);
    }
    else if (p2.y == p1.y) {
      return 180;
    }
    else if (p2.y > p1.y) {
      slope = (p2.y - p1.y) / (p2.x - p1.x);
      return Math.PI - Math.atan(slope);
    }
  }
};

function collide(p1,p2){
      dx = p1.actual.position.x - p2.actual.position.x;
      dy = p1.actual.position.y - p2.actual.position.y;

      dist = p1.actual.position.getDistance(p2.actual.position);
      if (dist <= p1.actual.radius + p2.actual.radius){
        angle = getAngle2(p1.actual.position, p2.actual.position);
        // total_mass = p1.mass + p2.mass;
        //
        // p1.angle += angle;
        // p1.speed =  p1.speed*(p1.mass-p2.mass)/total_mass + 2*p2.speed*p2.mass/total_mass;
        // p2.angle += angle + Math.PI;
        // p2.speed = p2.speed*(p2.mass-p1.mass)/total_mass + 2*p1.speed*p1.mass/total_mass;

        overlap = (p1.actual.radius + p2.actual.radius - dist + 1) * 0.5;
        p1.actual.position.x -= Math.cos(angle)*overlap;
        p1.actual.position.y += Math.sin(angle)*overlap;
        p2.actual.position.x += Math.cos(angle)*overlap;
        p2.actual.position.y -= Math.sin(angle)*overlap;
      }
};

function onMouseDown(event){
  make = true;
  par = new Particle(event.downPoint);
  for(var i = 0; i < particles.length; i++){
    if(particles[i].id !== par.id && particles[i].actual.contains(event.downPoint)){
      par.actual.remove();
      s_id -= 1;
      make = false;
    }
  }
}

function onMouseDrag(event){
  if(event.modifiers.shift){
    // var shift_point = event.point;
    // give_speed =  (shift_point - event.point).length;
    // console.log(give_speed);
    // give_angle = getAngle2(event.downPoint, event.point);
    shift = true;
  }
  else {
    var grow = true;
    for(var  i = 0; i < particles.length; i++){
      var my_par = particles[i];
      if(my_par.id === par.id){
        continue;
      };
      var dist = par.actual.position.getDistance(my_par.actual.position);
      if(dist <= par.actual.radius + my_par.actual.radius ){
        console.log("ouch");
        grow = false;
        break;
      }
    }
    if(make && grow){
      par.actual.set({
        radius: (event.downPoint - event.point).length
      });
    };
  };
};

function onMouseUp(event){
    color = new Color({
      hue: 360 * Math.random(),
      saturation: 1,
      brightness: 1
    });
    if(make){
      if(shift){
        par.initial_s =0.1 * ((event.point - event.downPoint).length - par.actual.radius);
        console.log(par.initial_s);
        par.initial_angle = Math.PI - getAngle2(event.downPoint, event.point);
      }
      par.mass = Math.pow(par.actual.radius,2) * 4;
      particles.push(par);
    }
};

function onFrame(event){
  for(var i = 0; i < particles.length; i++){
    particles[i].move();
    for(var j = i+ 1; j < particles.length; j++){
      collide(particles[i], particles[j]);
    };
  };
};
