
var color = new Color({hue: 360 * Math.random(), saturation: 1, brightness: 1});

var Particle = new function(){
  var group = new Group();
  var id = 0;
  var velocity = [0, 0];
  return {
    children: group.children,
    id: function(){
      id += 1;
      return id;
    }
    add: function(child){
      group.addChild(child);
    },

    equals: function(other){
      return this.position.equals(other.position) && this.id === other.id;
    }
  }
}; //Particle

function onMouseDrag(event){
  var par = new Shape.Circle({
    center: event.downPoint,
    radius: 1,
    fillColor: color,
    strokeColor: 'black'
  });
  Particle.add(par);

  lenPar = Particle.children.length;
  for(var  i = 0; i < lenPar; i++){
    if(){
      console.log("self");
      par.set({
        radius: (event.downPoint - event.point).length
      });
    }
    else if (!(Particle.children[i].intersects(par))) {
      par.set({
        radius: (event.downPoint - event.point).length
      });
    }
  }
  par.removeOnDrag();
};

function onMouseUp(event){
  color = new Color({hue: 360 * Math.random(), saturation: 1, brightness: 1});
};
