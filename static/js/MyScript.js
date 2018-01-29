
// Create a Paper.js Path to draw a line into it:
// var path = new Path();
// Give the stroke a color
// path.strokeColor = 'black';
// var start = new Point(100, 100);
// Move to start and draw a line from there
// path.add(start);
// path.add(new Point(10,300));
// alert("hi");
// Note the plus operator on Point objects.
// PaperScript does that for us, and much more!
// path.lineTo(start + [ 100, -50 ]);

var particles = []
var P

function Particle(x, y, radious) = {
  this.radious = radious;
  this.x = x;
  this.y = y;
  this.display = function display() {
    var par = new Path.circle(this.x, this.y, this.radious)
  }
}

function onMouseDown(event) {
	path = new Path();
	path.fillColor = new Color({ hue: Math.random() * 360, saturation: 1, brightness: 1 });

	path.add(event.point);
}

$(document).ready(onMouseDown)
