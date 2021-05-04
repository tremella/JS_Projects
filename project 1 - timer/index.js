//***************************
// TIME TO WORK ON THE BORDER
// new concept: SVG (scalable vector graphics)
// in order to do the circle animation, we need these.
// they are a set of HTML elements we can import to draw on the screen
//******************************
// MEANWHILE IN HTML LAND:
// a basic circle using SVG.
{/* <svg height="200" width="200">
<circle
transform="rotate(-90 100 100)" //rotates circle
r="90"
cx="100"
cy="100"
fill="transparent"
stroke="blue"
stroke-width="10"
stroke-dasharray="565" //fills border
stroke-dashoffset="-10"/> //erases border (backwards)
</svg> */}
// circle border = STROKE, circle inner = FILL
// we're going to use stroke-dasharray and stroke-dashoffset (its inverse) to handle the animation.
// 565.48 handles the whole circumference of the circle.

//these allow us to link to the HTML doc with the buttons.
const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circle = document.querySelector('circle');

// we need the perimeter for animation purposes.
const perimeter = circle.getAttribute('r') * 2 * Math.PI;
console.log('our perimeter is', perimeter)
circle.setAttribute('stroke-dasharray', perimeter);

// we need tick events to each be -1 * (perimeter/number of ticks)
// the -1 is so the dash border becomes eclipsed by the offset, its inverse.
// this invocation will include (optional) callbacks for the purpose of handling the border/visual for the timer.
let duration;
const timer = new Timer(durationInput,startButton,pauseButton, {
    onStart(totalDuration){
        console.log('timer started')
        duration = totalDuration;
    },
    onTick(timeRemaining){
        console.log('timer ticking down')
        circle.setAttribute('stroke-dashoffset',
        perimeter * timeRemaining / duration - perimeter
        );
    },
    onComplete(){
        console.log('done')
    }
})

