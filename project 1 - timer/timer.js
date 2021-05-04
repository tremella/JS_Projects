class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks){
        //the basic elements we need on creation of any timer instance.
        // callbacks are optional, made to handle animation

        //parameters are accessed from hereon as this.startButton, etc
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        if (callbacks) {    //callbacks optional.
            this.onStart = callbacks.onStart; //a reference to the onStart callback now exists.
            this.onTick = callbacks.onTick;  // ditto onTick and onComplete.
            this.onComplete = callbacks.onComplete;
        }
        // links button object to start method using a click listener
        this.startButton.addEventListener('click', this.start)
        this.pauseButton.addEventListener('click', this.pause)
    };
    start = () => { //method for starting countdown
        if (this.onStart) { //  "did we pass in callbacks?"
            this.onStart(this.timeRemaining);
            //see index.js for info
            //tldr; if callbacks for animation used, our total duration is now pulled from index.js for animation purposes
        }
        this.tick(); // an early tick so it starts w/out delay
        this.interval = setInterval(this.tick, 50) //implement tick every 50ms
        console.log(this.interval) // 1
    };
    pause = () => {
        clearInterval(this.interval); 
        //we terminate the interval after the running interval is given
        // this keyword pairs with setInterval. Pauses it.
    };
    //onDurationChange(){
        //method triggered if user sets/alters timer length
        //nothing here.
    //};
    tick = () => {
        if (this.timeRemaining <= 0) { // so it doesn't go below 0
            this.pause()
            if (this.onComplete){  //"did we pass in a callback?"
                this.onComplete(); // if so, console.log "done"
            }
        } else {
            this.timeRemaining = this.timeRemaining -.05; //50 miliseconds
            if (this.onTick) { //  "did we pass in a callback?"
                this.onTick(this.timeRemaining); // if so, implement!
                //fill in offset(whitespace) incrementally
            }
        }
        // setter and getter handles most of the extra work here
    };
    get timeRemaining(){ //retrieves value in tick
        return parseFloat(this.durationInput.value);
    }
    set timeRemaining(time) { //updates value  in tick
        this.durationInput.value = time.toFixed(2);
    }
}
