var canvas = new fabric.Canvas('c', { selection: false });
var grid = 25;

// create grid

for (var i = 0; i < (600 / grid); i++) {
  canvas.add(new fabric.Line([ i * grid, 0, i * grid, 675], { stroke: '#ccc', selectable: false }));
  canvas.add(new fabric.Line([ 0, i * grid, 575, i * grid], { stroke: '#ccc', selectable: false }))
}

var rect1 = new fabric.Rect({ 
  left: 50, 
  top: 50, 
  width: 125, 
  height: 225, 
  fill: '#faa',
  stroke:  'black',
  originX: 'left', 
  originY: 'top',
  centeredRotation: true
  
});
canvas.add(rect1);


var rotPos = 0;
document.getElementById("0").onclick = function() {rotate0()};
function rotate0() {
  rect1.set('angle', 0);
  console.log(rect1.get('angle'));
  canvas.renderAll();
  rotPos = 1;
  RectArray();
}
document.getElementById("90").onclick = function() {rotate90()};
function rotate90() {
  rect1.set('angle', 90);
  console.log(rect1.get('angle'));
  canvas.renderAll();
  rotPos = 2;
  RectArray();
}
document.getElementById("180").onclick = function() {rotate180()};
function rotate180() {
  rect1.set('angle', 180);
  console.log(rect1.get('angle'));
  canvas.renderAll();
  rotPos = 3;
  RectArray();
}
document.getElementById("270").onclick = function() {rotate270()};
function rotate270() {
  rect1.set('angle', 270);
  console.log(rect1.get('angle'));
  canvas.renderAll();
  rotPos = 4;
  RectArray();
}




// snap to grid

canvas.on('object:moving', function(options) { 
  options.target.set({
    left: Math.round(options.target.left / grid) * grid,
    top: Math.round(options.target.top / grid) * grid
  });
});



document.onmousedown = mouseDown;
document.onmouseup = mouseUp;
function mouseDown(ev) {
 if(canvas.getActiveObject()){
 console.log("MOUSE DOWN");
 copy();
 }
}
function mouseUp(ev) {
  if(canvas.getActiveObject()){
  console.log("MOUSE UP");
  paste();
  }
 }


function copy(){
    if(canvas.getActiveObject()){
        var object = fabric.util.object.clone(canvas.getActiveObject());
        object.set("top", object.top+5);
        object.set("left", object.left+5);
        copiedObject = object;

    }
}

function paste(){
    canvas.add(copiedObject.set({
      left: Math.round(copiedObject.left / grid) * grid,
      top: Math.round(copiedObject.top / grid) * grid
    }));
    copiedObject = canvas.getActiveObject();
    var leftCoord = copiedObject.left;
    var topCoord = copiedObject.top;
    console.log("Rect 1: ", leftCoord, topCoord);
  //  calcArray[leftCoord][topCoord];
  // canvas.discardActiveObject();
    canvas.renderAll();

}


var RectPos = [[],[]];
function RectArray(){
const RectPos1 = [[4,2,2,4], [4,2,2,4], [4,2,2,4], [4,2,2,4], [4,2,2,4], [8,4,4,8]];
const RectPos2 = [[8,4,4,4,4,4],[4,2,2,2,2,2],[4,2,2,2,2,2],[8,4,4,4,4,4]];
const RectPos3 = [[4,4,4,4,4,8],[2,2,2,2,2,4],[2,2,2,2,2,4],[4,4,4,4,4,8]];
const RectPos4 = [[8,4,4,8], [4,2,2,4], [4,2,2,4], [4,2,2,4], [4,2,2,4], [4,2,2,4]];
if(rotPos == 1){
  RectPos = RectPos1;
}
else if (rotPos == 2) {
  RectPos = RectPos2;
}
else if (rotPos == 3){
  RectPos = RectPos3;
}
else {
  RectPos = RectPos4;
}

console.log(RectPos);
console.log(RectPos.length, RectPos[0].length);
}

/*function calcArray(leftCoord, topCoord){
var BoxArray = [[],[]];
for(var x = 0; x < RectPos[0].length; x++){
  for(var y = 0; y < RectPos.length; y++){
    BoxArray[x][y] = BoxArray[x][y] + RectPos[x][y];
  }
}
}*/