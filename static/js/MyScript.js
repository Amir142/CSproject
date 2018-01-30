var particles = [];

// function onMouseDrag(event){
//     // The radius is the distance between the position
//     // where the user clicked and the current position
//     // of the mouse.
//     var path = new Path.Circle({
//         center: event.downPoint,
//         radius: (event.downPoint - event.point).length,
//         fillColor: 'white',
//         strokeColor: 'black'
//     });
//
//     // Remove this path on the next drag event:
//     path.removeOnDrag();
//     particles.push(path);
//     console.log(particles);
// };

var mouseDown = 0;
document.body.onmousedown = function() {
  ++mouseDown;
  console.log(mouseDown);
  var par = new Path.Circle({
      center: event.downPoint,
      radious: 0,
      fillColor: 'red',
      strokeColor: 'black'
  })
  while(mouseDown == 1){
    par.radious = event.downPoint - event.point;
    console.log(mouseDown);
  }
}

document.body.onmouseup = function(){
  --mouseDown;
}
// function draw(){
//   console.log("aa");
  // var par = new Path.Circle({
  //     center: event.downPoint,
  //     radious: 0,
  //     fillColor: new Color({ hue: Math.random() * 360, saturation: 1, brightness: 1 }),
  //     strokeColor: 'black'
  // })
  // while(mouseDown){
  //   par.radious = event.downPoint - event.point;
  // }
// };
