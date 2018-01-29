
var particles = []
// var canv = getElementById(game);
// canv.innerHTML('width') = 1000;

function DrawCircle(x,y,radious){
  var c = document.getElementById("game");
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.arc(x, y, radious, 0, 2 * Math.PI);
  ctx.stroke();
}
class Particle {
  constructor(x,y,radious) {
    this.x = x;
    this.y = y;
    // this. color = color;
    this. radious = radious;

  }
  display(){
    DrawCircle(this.x,this.y,this.radious)
  }
}

$(document).ready(function() {
  var par = new Particle(100,100,20)
  par.display()
})
