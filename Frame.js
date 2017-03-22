var AbacusView = function (model, canvas) {
    var Brec;
    var TBrec;
    var canvas;
    var sel;
    var beadCol = [
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

    var load = function () {
        canvas = new fabric.Canvas("myCanvas");
        //pos lable
        var lable = document.getElementById("Value");
        lable.style.paddingLeft = "1000px";
        var mycan = document.getElementById("myCanvas");



        var x = .08 * window.innerWidth;
        for (var i = 0; i < 8; i++) {
            var nLines = makeLines(x);
            nLines.selectable = false;
            x += .08 * window.innerWidth;
            canvas.add(nLines);
        }
        //bottom box
        Brec = new fabric.Rect({
            width: .72 * window.innerWidth,
            height: .43 * window.inn
            left: 6,
            top: 171,
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
        var obj = evt.target;
        moveAll(obj.column, obj.place, obj.level);

        canvas.deactivateAll().renderAll();
    } //end starting

    //makes beads stay in bounds
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
                    beads.lockMovementY = true;
                    beads.place = t;
                    vertic_Scal -= 40;
                    beadCol[i].bottom.push(beads);
                    canvas.add(beads);
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
                    beads.lockMovementY = true;
                    beads.place = tb;
                    vert_Scal += 40;
                    tb++;
                    beadCol[i].top.push(beads);//add bead to beadcold
                    canvas.add(beads);
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

    var moveAll = function (colbeads, idx, level) {//true = top
        if (level) {
            if (beadCol[colbeads].top[idx].clicked) {//move bead up
                //get list of clicked beads behind supplied
                var toMove = beadCol[colbeads].top.filter(
                    b => b.clicked).filter(b => b.place <= idx);
                for (var i = 0; i < toMove.length; i++) {
                    toMove[i].clicked = !toMove[i].clicked;
                    animator(toMove[i], false, 56.5);
                }
            }
            else {//move down
                var toMove = beadCol[colbeads].top.filter(
                                    b => !b.clicked).filter(b => b.place >= idx);
               
                for (var i = 0; i < toMove.length; i++) {
                    toMove[i].clicked = !toMove[i].clicked;
                    animator(toMove[i], true, 56.5);
                }
            }
        }
        else {//move bottom beads
            if (!beadCol[colbeads].bottom[idx].clicked) {//move beads up
                var toMove = beadCol[colbeads].bottom.filter(
                   b => !b.clicked).filter(b => b.place >= idx);
                for (var i = 0; i < toMove.length; i++) {
                    toMove[i].clicked = !toMove[i].clicked;
                    animator(toMove[i], false, 79.5);
                }
            }
            else {//move beads down
                var toMove = beadCol[colbeads].bottom.filter(
                   b => b.clicked).filter(b => b.place <= idx);
                for (var i = 0; i < toMove.length; i++) {
                    toMove[i].clicked = !toMove[i].clicked;
                    animator(toMove[i], true, 79.5);
                }
            }
        }

        calculate();


    }
    var animator = function (bead, up, scale) {//move  beads
        
        bead.animate('top', bead.top + (up ? 1 : -1) * scale, {
            duration: 500,
            onChange: canvas.renderAll.bind(canvas)
        });
    }
    var calculate = function () {
        var total = 0;
        for (var i = 0; i < 8; i++) {//loop coloumns

            for (var top = 0; top < 2; top++) {//check top beads
              //  console.log(beadCol[i].top[top].clicked + i);
                if (beadCol[i].top[top].clicked) {
                    var temp = Math.pow(10, 7 - i);
                    total += temp * 5;
                }
            }
            for (var bottom = 0; bottom < 5; bottom++) {
                if (beadCol[i].bottom[bottom].clicked) {
                    total += Math.pow(10, 7 - i);
                }
            }
        }//end for
        var tLable = document.getElementById("Value");
        tLable.textContent = total;
    }
    load();



};