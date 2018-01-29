
var particles = []
// var canv = getElementById(game);
// canv.innerHTML('width') = 1000;

function DrawCircle(){
  var c = document.getElementById("game");
  alert("hi");
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.arc(100, 100, 50, 0, 2 * Math.PI);
  ctx.stroke();
}
$(document).ready(function() {
  // var c = document.getElementById("game");
  alert("hi");
  // var ctx = c.getContext("2d");
  // ctx.beginPath();
  // ctx.arc(100, 100, 50, 0, 2 * Math.PI);
  // ctx.stroke();
  DrawCircle()
})
alert("hi2");
// class Particle {
//   constructor(x,y,radious) {
//     this.x = x;
//     this.y = y;
//     // this. color = color;
//     this. radious = radious;
//
//   }
//   display(){
//     DrawCircle(this.x,this.y,this.radious)
//   }
// }
//
// var par = new Particle(100,100,50)
// par.display()
// alert("hi")
