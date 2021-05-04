// MAZE GAME
// key challenge: how do we make the data structure to create a maze?
//      answer: using an algorithm. we'll also earn about tree data structures
// how do we draw it on the screen?
//      answer: using matter js brm.io/matter-js
//      preview HERE https://brm.io/matter-js/demo/#mixed
// how are we going to make keyboard keys interact with the ball?
// how will we know when the ball touches the end point?

// USEFUL TERMINOLOGY HERE
// https://brm.io/matter-js/docs/
// key terms:
// world: object which holds all the 'things' (shapes) and info about how they've moved
// engine: reads the state of the world, and calculates changes in positions. Handles transitions.
// runner: (runs 60 times per second) and tels the endine to process the WORLD's data
// render: render turns data into visuals
// body: a shape we display. like a circle, a square.

// before making the map, we'll do a demo of some dynamic shapes first.
// see C:\Users\Jess\JavaScript Tutes\js projects\project 3 - maze game\just some cute lil shapes