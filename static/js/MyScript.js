var par;
var s_id = 1;
var color = new Color({hue: 360 * Math.random(), saturation: 1, brightness: 1});
var make;
var particles = [];
var g = 0.006;

function Particle(center){
  this.id = s_id;
  s_id += 1;
  this.center = center;
  this.vector = [0, 0];
  this.actual = new Shape.Circle({
      center: this.center,
      radius: 0,
      fillColor: color,
      strokeColor: 'black'
  });
  this.mass = Math.pow(this.actual.radius,3) * 4;
  this.gravitate = function(){
    for(var i = 0; i < particles.length; i++){
      var new_vector = (g * this.mass * particles[i].mass) / (Math.pow((particles[i].actual.position - this.actual.position),2))
      var path = new Path([this.actual.position,new_vector]);
      path.set({
        strokeColor: red
      });
      this.actual.position += new Point(new_vector - this.actual.position);
    }
  }
}; //Particle

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
  var grow = true;
  for(var  i = 0; i < particles.length; i++){
    var my_par = particles[i];
    if(my_par.id === par.id){
      continue;
    };
    var dist = par.center.getDistance(my_par.center);
    if(dist <= par.actual.radius + my_par.actual.radius + 5 /*2bsafe*/ ){
      console.log("ouch");
      grow = false;
      break;
    }
  }
  if(make && grow){
    par.actual.set({
      radius: (event.downPoint - event.point).length
    });
  }

};

function onMouseUp(event){
    color = new Color({hue: 360 * Math.random(), saturation: 1, brightness: 1});
    if(make){
      console.log(par.id);
      console.log(par.actual.radius);
      particles.push(par);
    }
};
// 
// for(var i; i < particles.length; i++){
//   console.log("gravitating");
//   particles[i].gravitate();
// };
