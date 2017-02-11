var columns = [
    {
        top: [false, false],
        bottom: [false, false, false, false, false]
    },
    {
        top: [false, false],
        bottom: [false, false, false, false, false]
    },
    {
        top: [false, false],
        bottom: [false, false, false, false, false]
    },
    {
        top: [false, false],
        bottom: [false, false, false, false, false]
    },
    {
        top: [false, false],
        bottom: [false, false, false, false, false]
    },
    {
        top: [false, false],
        bottom: [false, false, false, false, false]
    },
    {
        top: [false, false],
        bottom: [false, false, false, false, false]
    },
    {
        top: [false, false],
        bottom: [false, false, false, false, false]
    }
]

/*
/takes a input of the coloumn level and place of a bead
/ sets the bool of the bead to its inverse
**/
var flipBead = function (col, lev, place) {
    if (lev) {//true if top
        columns[c].top[place] = !columns[c].top[place];
    }
    else {
        columns[c].bottom[place] = !columns[c].bottom[place];
    }
    
};