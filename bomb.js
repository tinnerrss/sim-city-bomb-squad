/* -------Game State/Global Varibles ----*/
let wires = {
    blue: {
        color: "blue",
        cut: false,
        needsCut: false,
        cutImg: "img/cut-blue-wire.png",
        uncutImg: "img/uncut-blue-wire.png"
    },
    green: {
        color: "green",
        cut: false,
        needsCut: false,
        cutImg: "img/cut-green-wire.png",
        uncutImg: "img/uncut-green-wire.png"
    },
    red: {
        color: "red",
        cut: false,
        needsCut: false,
        cutImg: "img/cut-red-wire.png",
        uncutImg: "img/uncut-red-wire.png"
    },
    white: {
        color: "white",
        cut: false,
        needsCut: false,
        cutImg: "img/cut-white-wire.png",
        uncutImg: "img/uncut-white-wire.png"
    },
    yellow: {
        color: "yellow",
        cut: false,
        needsCut: false,
        cutImg: "img/cut-yellow-wire.png",
        uncutImg: "img/uncut-yellow-wire.png"
    }
};

const STARTING_TIME = 30;
let remainingTime = STARTING_TIME;
let wiresToCut = [];
let countdown = null;
let delay = null;
let gameOver = true;

/* -------------Functions------------*/
let gameInit = function() {
    let domWires = document.querySelectorAll("img");
    // console.log(domWires);
    let domResetBtn = document.querySelector(".reset");
    let domTimer = document.querySelector(".countdown");
    document.getElementById("success").pause();
    document.getElementById("success").currentTime = 0;
    
    //tell js game is on
    gameOver = false;
    //set wiresToCut = []
    wiresToCut = [];
     //reset timer
     remainingTime = STARTING_TIME;
     //reset wire imgs
     for (let i = 0; i < 5; i++) {
         domWires[i].src = `img/uncut-${domWires[i].id}-wire.png`;
         //reset corrosponding js wire to be uncut
         wires[domWires[i].id].cut = false;
     }
     //disable button
     domResetBtn.disabled = true;
     //reset background
     document.querySelector("body").classList.remove("flat-city");
     document.querySelector("body").classList.add("happy-city");
     //make countdown RED
     domTimer.classList.remove("countdown-saved");
     domTimer.classList.add("countdown-panic");
     //reset timer
     remainingTime = STARTING_TIME;
    //set wires to be cut (includes pushing to wiresToCut)
    for (let wire in wires) {
        let rand = Math.random();
        if (rand > 0.5) {
            wiresToCut.push(wire)
        }
    }
    console.log(wiresToCut);
    //play siren
    document.getElementById("siren").play();
    //start countdown
    countdown = setInterval(updateClock, 100);
    //play siren
};

let endGame = function(win) {
    //if win is true, run win stuff, else run boom stuff
    clearInterval(countdown);
    clearTimeout(delay);
    gameOver = true;
    document.querySelector(".reset").disabled = false;
    document.getElementById("siren").pause();

    if (win) {
        console.log("horray!");
        //make timer green
        document.querySelector(".countdown").classList.remove("countdown-panic");
        document.querySelector(".countdown").classList.add("countdown-saved");
        //talk sounds
        document.getElementById("yay").play;
        document.getElementById("success").play;
    } else {
        console.log("KABOOM!");
        //change  background
        document.body.classList.remove("happy-city");
        document.body.classList.add("flat-city");
        document.getElementById("explode").play();
    }
}

let updateClock = function() {
    //todo countdown in miliseconds 
    remainingTime--;
    if (remainingTime <= 0) {
        //todo end game as loser
        endGame(false);
    } 
    document.querySelector(".countdown").textContent = `00:00:${remainingTime < 10 ? "0" + remainingTime : remainingTime}`;
}

let wireClickHandler = function(e) {
    //check if wire has been cut
    if (!wires[e.target.id].cut && !gameOver) {
        //tell javascript we've cut the wire
        wires[e.target.id].cut = true;
        //change img
        e.target.src = wires[e.target.id].cutImg;
        // play buzz    
        document.getElementById("buzz").play();
        //check if it's in wire to cut
        let wireIndex = wiresToCut.indexOf(e.target.id); 
        if (wireIndex > -1) {
            console.log("good so far")
            wiresToCut.splice(wireIndex, 1);
        if (wiresToCut.length === 0) {
            endGame(true);
        } else {
            delay = setTimeout(function() {
                console.log("Yikes, you've still got 750 miliseconds");
                endGame(false);
            }, 750);
        }
        // disable future clicks
        }
    }
};


document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".wires").addEventListener("click", wireClickHandler);
    document.querySelector(".reset").addEventListener("click", gameInit);
    
    gameInit();
})