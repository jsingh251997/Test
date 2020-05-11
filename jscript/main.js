/***************Draggable OBJECT*********/
/*dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


*/


var canvas = new fabric.Canvas('c', { selection: false });
var grid = 25;

// create grid

for (var i = 0; i < (600 / grid); i++) {
  canvas.add(new fabric.Line([ i * grid, 0, i * grid, 675], { stroke: '#ccc', selectable: false }));
  canvas.add(new fabric.Line([ 0, i * grid, 575, i * grid], { stroke: '#ccc', selectable: false }))
}

// add objects

canvas.add(new fabric.Rect({ 
  left: 50, 
  top: 50, 
  width: 175, 
  height: 225, 
  fill: '#faa',
  stroke:  'black',
  originX: 'left', 
  originY: 'top',
  centeredRotation: true
  
}));




// snap to grid

canvas.on('object:moving', function(options) { 
  options.target.set({
    left: Math.round(options.target.left / grid) * grid,
    top: Math.round(options.target.top / grid) * grid
  });
});



document.onmousedown = mouseDown;

function mouseDown(ev) {
 console.log("MOUSE PRESSED");
 copy();
 paste();
}


function copy(){
    if(canvas.getActiveObject()){
        var object = fabric.util.object.clone(canvas.getActiveObject());
        object.set("top", object.top+5);
        object.set("left", object.left+5);
        copiedObject = object;
        copiedObjects = new Array();
    }
}

function paste(){
    canvas.add(copiedObject.set({
      left: Math.round(copiedObject.left / grid) * grid,
      top: Math.round(copiedObject.top / grid) * grid
    }));
    canvas.renderAll();    
}

