var AbacusView = function (model, canvas) {
    var Brec;
    var TBrec;
    var canvas;
    var sel;
    var load = function () {
        canvas = new fabric.Canvas("myCanvas");

        var x = 110;
        for (var i = 0; i < 8; i++) {
            var nLines = makeLines(x);
            nLines.selectable = false;
            x += 110;
            canvas.add(nLines);
        }
        //bottom box
        Brec = new fabric.Rect({
            width: 989,
            height: 280,
            left: 6,
            top: 172,
            selectable: false,
            fill: 'rgba(0,0,0,0)',
            stroke: "black"
        });
        Brec.lockMovementX = true;
        Brec.lockMovementY = true;
        canvas.add(Brec);
        TBrec = new fabric.Rect({
            width: 989,
            height: 138,
            left: 6,
            top: 32,
            selectable: false,
            fill: 'rgba(0,0,0,0',
            stroke: "black"
        });
        TBrec.lockMovementX = true;
        TBrec.lockMovementY = true;
        canvas.add(TBrec);

        makeBeads(canvas);
        //canvas.on("mouse:over", moveHandler);
        canvas.on("object:moving", checkBounds);
        canvas.on("object:selected", Starting);
    }

    var Starting = function (evt) {
        canvas.deactivateAll();
        var obj = evt.target;
        console.log("Starting " + obj.place);
        if (!obj.clicked) { //has not been clicked
            if (!obj.level) { //bottom bead
                if (!columns[obj.column].bottom[obj.place]) { //value on calculate is false
                    //THIS MIGHT BE SIMPLIFIED USING A ANIMATE FUNCTION THAT MOVES ALL NON MOVED BEADS
                    if (obj.place < 4 && !columns[obj.column].bottom[obj.place+1] ) {
                        //TODO:: Move the cliked bead and all beads ahead of it up.
                    } else {
                        //TODO:: move clicked bead up
                        console.log("<4");
                        obj.setTop(obj.top - 69).setCoords();
                        obj.clicked = !obj.clicked;
                        flipBead(obj.column, obj.level, obj.place);
                    }
                }
            } else { //Top Bead
                if (!columns[obj.column].top[obj.place]) {
                    if (obj.place < 1 && !columns[obj.column].top[obj.place+1] ) {
                        //TODO:: MOVE BOTH BEADS DOWN
                    } else {
                        //TODO:: Move clicked bead
                    }
                }
            }

        } //end !clicked
        else if (obj.clicked) { //clicked is true
            if (!obj.level) { //bottom level
                if (columns[obj.column].bottom[obj.place]) {
                    if (obj.place > 0 && columns[obj.column].bottom[obj.place-1] ) {
                        //TODO:: Move all beads from obj.place to 0 down
                    } else {
                        //TODO:: Move last bead down
                        console.log("<4 down");
                        obj.setTop(obj.top + 68).setCoords();
                        obj.clicked = !obj.clicked;
                        flipBead(obj.column, obj.level, obj.place);
                    }
                } else if (obj.level) { //Top level
                    if (columns[obj.column].top[obj.place]) {
                        if (obj.place > 0 && columns[obj.column].top[0] ) {
                            //TODO:: move all beads 
                        } else {
                            //TODO:: Moved clicked beads
                        }
                    }
                }
            }
        }
        canvas.renderAll();
        intersectingCheck(obj);
        //canvas.deactivateAll().renderAll();
    } //end starting

    var group_objects_up = new function (place, col, level) {
        var list = [];
        if (level) {
           
        }
        else {//bottom bead
            for (var i = place; i <= 4; i++) {//move all unmoved beads into group
                
            }
        }
    }

    //makes beads stay in boundsv
    var checkBounds = function (evt) {
        var obj_type = evt.target;
        if (obj_type.isType('circle')) {
            var top = obj_type.top;
            var bottom = top + obj_type.height;
            var left = obj_type.left;
            var right = left + obj_type.width;

            if (obj_type.level) { //top bead
                var topBound = TBrec.top;
                var bottomBound = topBound + TBrec.height;
                var leftBound = TBrec.left;
                var rightBound = leftBound + TBrec.width;
            } else if (!obj_type.level) {
                var topBound = Brec.top;
                var bottomBound = topBound + Brec.height;
                var leftBound = Brec.left;
                var rightBound = leftBound + Brec.width;
            }
            // obj_type.setLeft(Math.min(Math.max(left, leftBound), rightBound - evt.width));
            obj_type.setTop(Math.min(Math.max(top, topBound), bottomBound - obj_type.height));
            intersectingCheck(obj_type);
        } //end if
    }

    var moveHandler = function (evt) {
        var moving = evt.target;
        console.log(moving.top + "left: " + moving.left + "W: " + moving.type);
        //console.log(moving.getOriginY() + "X: " + moving.getOriginX() + "SX: " + moving.getScaleX() + "SY: " + moving.getScaleY());

    }

    //makes lines for abacus
    var makeLines = function (xCord) {
        var Lines = new fabric.Line([xCord, 32, xCord, 450], {
            stroke: "black"
        });
        return Lines;
    }
    var makeBeads = function (canvas) {
        var left_Scal = 89;
        var vertic_Scal = 411; //for bottom
        var vert_Scal = 33; //for top
        for (var i = 0; i < 8; i++) {
            var tb = 0; //top bead 
            for (var t = 0; t < 7; t++) {
                if (t < 5) { //make bottom beads
                    var beads = new fabric.Circle({
                        top: vertic_Scal,
                        left: left_Scal,
                        radius: 20,
                        fill: "red"
                    });
                    beads.column = i;
                    beads.clicked = false;
                    beads.level = false;
                    beads.lockMovementX = true;
                    beads.place = t;
                    canvas.add(beads);
                    vertic_Scal -= 41;
                } else { //make top beads
                    var beads = new fabric.Circle({
                        top: vert_Scal,
                        left: left_Scal,
                        radius: 20,
                        fill: "red"
                    });
                    beads.column = i;
                    beads.level = true;
                    beads.clicked = false;
                    beads.lockMovementX = true;
                    beads.place = tb;
                    canvas.add(beads);
                    vert_Scal += 41;
                    tb++;
                }
            }
            left_Scal += 110; //move to next col
            vertic_Scal = 411; //location of top first bead on the bottom
            vert_Scal = 33; //location of the first bead on top
        }
    }

    function intersectingCheck(activeObject) {
        activeObject.setCoords();
        if (typeof activeObject.refreshLast != 'boolean') {
            activeObject.refreshLast = true
        };

        //loop canvas objects
        activeObject.canvas.forEachObject(function (targ) {
            if (targ === activeObject) return; //bypass self

            //check intersections with every object in canvas
            if (activeObject.intersectsWithObject(targ) && targ.isType('circle')) {
                //objects are intersecting - deny saving last non-intersection position and break loop
                if (typeof activeObject.lastLeft == 'number') {
                    activeObject.left = activeObject.lastLeft;
                    activeObject.top = activeObject.lastTop;
                    activeObject.refreshLast = false;
                    return;
                }
            } else {
                activeObject.refreshLast = true;
            }
        });

        if (activeObject.refreshLast) {
            //save last non-intersecting position if possible
            activeObject.lastLeft = activeObject.left
            activeObject.lastTop = activeObject.top;
        }
    }

    load();
};

var bead_Cols = [
    {
        top: [],
        bottom: []
    },
    {
        top: [],
        bottom: []
    },
    {
        top: [],
        bottom: []
    },
    {
        top: [],
        bottom: []
    },
    {
        top: [],
        bottom: []
    },
    {
        top: [],
        bottom: []
    },
    {
        top: [],
        bottom: []
    },
    {
        top: [],
        bottom: []
    }
]