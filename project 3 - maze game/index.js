//importing and destructuring key elements from matter.js
const { // destructuring these from matter.js
    Engine, //for updating the world
    Render, //for visuals
    Runner, // assists engine
    World,  //the space
    Bodies, //allows adding bodies (shapes)
    Body,   //special manipulations of shapes.
    Events  //for collision events.
} = Matter; //global variable created by putting Matter.JS into our HTML doc

//defining height, width, calls, etc
const width = window.innerWidth;
const height = window.innerHeight;
const cellsHorizontal = 9;
const cellsVertical = 6;
const unitLengthX = width / cellsHorizontal;
const unitLengthY = height / cellsVertical;

const engine = Engine.create(); // creating a new Engine (which we imported from matter.js).
engine.world.gravity.y = 0
const {world} = engine; // technically when we make an engine, we also get a world object.

// THIS IS OUR RENDER OBJECT
const render = Render.create({
    element: document.body, // tells where in the DOM we want to draw the world: document.body.
    // element == a HTML canvas element.
    engine: engine, // link to const engine above
    options: {
        wireframes: false,
        width,
        height //px
    }
});
Render.run(render);
Runner.run(Runner.create(), engine); //runner co-ords world changes into engine, which implements.

// WALLS - an array with the 4 'border' shapes we need
const walls = [
    Bodies.rectangle((width/2), 0, width, 10, {
        isStatic: true
    }), //it can sit outside the canvas.
    Bodies.rectangle((width/2), height, width, 10, {
        isStatic: true
    }),
    Bodies.rectangle(0, (height/2), 10, height, {
        isStatic: true
    }),
    Bodies.rectangle(width, (height/2), 10, height, {
        isStatic: true
    })
]
World.add(world, walls);

//SHUFFLE HELPER FUNCTION, FOR SHUFFLING NEIGHBORS
const shuffle = (arr) => {
    let counter = arr.length;
    while (counter > 0) {
        const index = Math.floor(Math.random() * counter); //random index in the array
        counter--; //decrease by 1, counter iterates from end to start
        //swap elements at index of index, and index of counter
        const temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
    }
    return arr;
}

//MAZE GENERATION: make GRID, make HORIZONTAL AND VERTICAL ARRAYS
const grid = Array(cellsVertical).fill(null).map(() => Array(cellsHorizontal).fill(false));
// alter this      ^ for # of rows, alter this   ^ to alter # of columns
// console.log('grid!!',grid)
const verticals = Array(cellsVertical).fill(null).map(()=>Array(cellsHorizontal -1).fill(false)); // ( | )
// 3 rows (|), then 2 cols (|)
const horizontals = Array(cellsVertical -1).fill(null).map(()=> Array(cellsHorizontal).fill(false));// ( _ )
// 2 rows (_) then 3 cols of (_)


// CHOOSE A RANDOM STARTING CELL
const startRow = Math.floor(Math.random () * cellsVertical);
const startColumn = Math.floor(Math.random () * cellsHorizontal);
//console.log(startRow, startColumn)

//FOR MAZE BUILDING: ALTER VERTICAL AND HORIZONTAL ARRAYS
const stepThroughCell = (row, column) => {
    // If I've visited the cell at [row, column], then return
    if (grid[row][column]) { // implicit True: "if THING exists". if grid[0][1] (NOT written as [0[1]])
        return;
    }
    // Mark this cell as visited
    grid[row][column] = true;
    // Assemble randomly-ordered list of neighbors
    const neighbors = shuffle([ //embed neighbors in shuffle function
        [row - 1, column, 'up'],
        [row, column + 1, 'right'],
        [row + 1, column, 'down'],
        [row, column - 1, 'left']
    ]);

    // for each neighbor...
    for (let neighbor of neighbors) {
        const [nextRow, nextColumn, direction] = neighbor; // potential next destination
        if (nextRow < 0 || nextRow >= cellsVertical || nextColumn < 0 || nextColumn >= cellsHorizontal) {
            continue; //if neighbor is out of bounds continue w/out doing anything
        }
    // if we have visited it already (it's "TRUE")
        if (grid[nextRow][nextColumn]) {
        continue; //continue w/out doing anything with this case
        }
    // else, do one of these:
    //remove a wall either from hori or vert array
        if (direction === 'left') {
            verticals[row][column -1] = true;
        } else if (direction === 'right') {
            verticals[row][column] = true;
        } else if (direction === 'up') {
            horizontals[row-1][column] = true;
        } else if (direction === 'down') {
            horizontals[row][column] = true;
        }
        stepThroughCell(nextRow, nextColumn)
    }
    // Visit that next cell
};
stepThroughCell(startRow, startColumn);

// RENDERS ALTERED HORIZONTAL/VERTICAL ARRAYS as THIN RECTANGLES (WALLS)
horizontals.forEach((row, rowIndex) => {
    //will iterate over an inner array [[],[]] (so, a row) but NOT the elements,
    //because horizontals is a nested array
    row.forEach((open, columnIndex) => {
        if (open) { //implicit true
            return;
        } //implicit else
        const wall = Bodies.rectangle(
            columnIndex * unitLengthX + unitLengthX / 2, //center of rectangle X
            rowIndex * unitLengthY + unitLengthY,         //center of rectangle Y
            unitLengthX, //length
            5,
            {
                label: 'wall',
                isStatic: true,
                render: {
                    fillStyle: 'rgb(00,220,190)'
                }
            }
        );
        World.add(world, wall);
    });
});
verticals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
        if (open) {
            return;
        }
        const wall = Bodies.rectangle(
            columnIndex * unitLengthX + unitLengthX,
            rowIndex*unitLengthY+unitLengthY/2,
            5,
            unitLengthY, //height
            {
                label: 'wall',
                isStatic: true,
                render: {
                    fillStyle: 'rgb(00,220,190)'
                }
            }
        );
        World.add(world, wall);
    })
})

//GOAL CREATE
const goal = Bodies.rectangle (
    // should be bottom right cell
    width - unitLengthX / 2, // X coord should be total width - (unit length/2)
    height - unitLengthY / 2, // y coord should be height - (unitLength/2)
    unitLengthX * .7, // make size smaller than a cell but only by a bit
    unitLengthY * .7,
    {
        isStatic: true,
        label: 'goal',
        render: {
            fillStyle: 'rgb(30,160,60)'
        }
    }
);

//BALL CREATE
const ballRadius = Math.min(unitLengthX, unitLengthY) /4 // whichever is smaller
const ball = Bodies.circle(
    unitLengthX/2,
    unitLengthY/2,
    ballRadius,
    {
        isStatic: false,
        label: 'ball',
        render: {
            fillStyle: 'rgb(290,170,0)'
        }
    }
)

World.add(world, goal);
World.add(world, ball);

//CONTROL BALL
// http://keycode.info/ tells us the keycode # for whatever we press
document.addEventListener('keydown', event => {
    const {x , y} = ball.velocity;// this stacks
    //console.log(x,y)
    if (event.key=== 'ArrowUp') {
        Body.setVelocity(ball,{ x: x, y: y-5})
        //console.log('move up');
    }
    if (event.key === 'ArrowRight') {
        Body.setVelocity(ball,{ x: x+5, y: y})
        //console.log('move right');
    }
    if (event.key === 'ArrowDown') {
        Body.setVelocity(ball,{ x: x, y: y+5})
        //console.log('move down');
    }
    if (event.key === 'ArrowLeft') {
        Body.setVelocity(ball,{ x: x -5, y: y})
        //console.log('move left');
    }
});

// WIN CONDITION
Events.on(engine, 'collisionStart', event => {
    // console.log(event) // in THIS case, there is only ONE event Object throughout time.
    //This object is wiped and re-used, therefore in order to get info we want, we do THIS:
    event.pairs.forEach((collision) => {
        // here's a quick way to ask 'did they collide'?
        const labels = ['ball', 'goal'];

        if (
            labels.includes(collision.bodyA.label) &&
            labels.includes(collision.bodyB.label)
        ) {
            document.querySelector('.winner').classList.remove('hidden');
            world.gravity.y = 1; // WIN ANIMATION part 1
            world.bodies.forEach(body => {
                if (body.label === 'wall') {
                    Body.setStatic(body, false);
                }
            })
        }
    });
});
