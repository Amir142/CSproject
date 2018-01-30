var path;
var pars = [];
var color = new Color({hue: 360 * Math.random(), saturation: 1, brightness: 1});

// function onMouseDown(event){
// };

function onMouseDrag(event) {
    // The radius is the distance between the position
    // where the user clicked and the current position
    // of the mouse.
    par = new Path.Circle({
        center: event.downPoint,
        radius: (event.downPoint - event.point).length,
        fillColor: color,
        strokeColor: 'black'
    });

    // Remove this path on the next drag event:
    par.removeOnDrag();
};

function onMouseUp(event){
  color = new Color({hue: 360 * Math.random(), saturation: 1, brightness: 1});
  pars.push(par);
  console.log(pars);
  move();
};

function move(){
  for(p = 0; p < pars.length; p += 1){
    pars[p].center = new Point(100,100);
  }
};
