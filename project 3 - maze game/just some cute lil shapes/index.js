// new things this lesson: MOUSE CONSTRAINT
// MOUSE CONSTRAINT: responds to mouse input


const {
    Engine,
    Render,
    Runner,
    World,
    Bodies,
    MouseConstraint,
    Mouse
} = Matter; // destructuring these from matter.js
// Matter is the global variable we for from putting matter-js in our HTML doc.

// making these here so we can reference them and update across the whole file with ease
const width = 1050;
const height = 650;

const engine = Engine.create(); // creating a new Engine (which we imported from matter.js).
const { world } = engine; // technically when we make an engine, we also get a world object.
// This is our Render object.
const render = Render.create({
    element: document.body, // tells where in the DOM we want to draw the world: document.body.
                            // element == a HTML canvas element.
    engine: engine,         // link to const engine above
    options : {
        wireframes: false,
        width,
        height//px
    }
});
Render.run(render);
Runner.run(Runner.create(),engine); //runner coords world changes into engine, which implements.

// WALLS - an array with the 4 'border' shapes we need
const walls = [
    Bodies.rectangle((width/2), 0, width, 40, {
        isStatic: true
    }), //it can sit outside the canvas.
    Bodies.rectangle((width/2), height, width, 40, {
        isStatic: true
    }),
    Bodies.rectangle(0, (height/2), 40, height, {
        isStatic: true
    }),
    Bodies.rectangle(width, (height/2), 40, height, {
        isStatic: true
    })
]

// Generate random shapes
for (let i = 0; i < 380; i++) {
    if (Math.random() < 0) {
        World.add(
            world,
            Bodies.rectangle(Math.random()* width, Math.random()* height,40,40)
        );
    } else {
        World.add(
            world,
            Bodies.circle(Math.random()* width, Math.random()* height, Math.random()*40, {
                render: {
                    // fillStyle: 'green'
                }
            })
        );
    };
}

World.add(world, MouseConstraint.create(engine, { // add mouse to world
    mouse: Mouse.create(render.canvas)
}))
World.add(world, walls); // we always have to add things to the world for them to appear.

