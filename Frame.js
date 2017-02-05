var Brec;
var TBrec;
var canvas;
var sel;
var load = function () {
canvas = new fabric.Canvas("myCanvas");

var x = 110;
for (var i = 0; i < 8; i++) {
    var nLines = makeLines(x);
    x += 110;
    canvas.add(nLines);
}

Brec = new fabric.Rect({ width: 989, height: 280, left: 6, top: 172, selectable: false, fill: 'rgba(0,0,0,0)', stroke: "black" });
Brec.lockMovementX = true; Brec.lockMovementY = true; 
canvas.add(Brec);
TBrec = new fabric.Rect({ width: 989, height: 139, left: 6, top: 32, selectable: false, fill: 'rgba(0,0,0,0', stroke: "black" });
TBrec.lockMovementX = true; TBrec.lockMovementY = true; 
canvas.add(TBrec);

makeBeads(canvas);
//canvas.on("mouse:over", moveHandler);
canvas.on("object:moving", checkBounds(TBrec, Brec));
}


//makes beads stay in bounds
var checkBounds = function (evt) {
    console.log("running");
    var top = evt.top;
    var bottom = top + evt.height;
    var left = evt.left;
    var right = left + evt.width;

    if (evt.level) {//top bead

    }
    else if(!evt.level) {
        var topBound = Brec.top;
        var bottomBound = topBound + Brec.height;
        var leftBound = Brec.left;
        var rightBound = leftBound + Brec.width;
        console.log("Run");
    }
    evt.setLeft(Math.min(Math.max(left, leftBound), rightBound - evt.width));
    evt.setTop(Math.min(Math.max(top, topBound), bottomBound - evt.height));
}

var moveHandler = function (evt) {
    var moving = evt.target;
     console.log(moving.top + "left: " + moving.left + "W: " + moving.type );
    //console.log(moving.getOriginY() + "X: " + moving.getOriginX() + "SX: " + moving.getScaleX() + "SY: " + moving.getScaleY());
    
}

//makes lines for abacus
var makeLines = function (xCord) {
    var Lines = new fabric.Line([xCord, 32, xCord, 450], { stroke: "black" });
    return Lines;
}
var makeBeads = function (canvas) {
    var left_Scal = 89;
    for(var i = 0; i < 8; i++){
        for (var t = 0; t < 7; t++) {
            if (t < 5) {//make bottom beads
                var beads = new fabric.Circle({ top: 411, left: left_Scal, radius: 20, fill: "red" });
                beads.collomn = i;
                beads.level = false;
                beads.lockMovementX = true;
                beads.place = t;
                canvas.add(beads);
            }
            else {//make top beads

            }
        }
        left_Scal += 110;
    }
}