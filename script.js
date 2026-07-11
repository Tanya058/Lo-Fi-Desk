const musicTracks = {
    "lofi-chill": new Audio("sounds/lofi-chill.mp3"),
    "lofi-soft": new Audio("sounds/lofi-soft.mp3"),
    "lofi-sample": new Audio("sounds/lofi-sample.mp3")
};

const ambience = {
    rain: new Audio("sounds/rain.mp3"),
    darkRain: new Audio("sounds/dark-rain.mp3"),
    fireplace: new Audio("sounds/fireplace.mp3"),
    vinyl: new Audio("sounds/vinyl.mp3")
};

Object.values(musicTracks).forEach(track=>{
    track.loop=true;
});

Object.values(ambience).forEach(sound=>{
    sound.loop=true;
    sound.volume=0;
});

let currentMusic=null;

document.querySelectorAll('input[name="music"]').forEach(radio => {

    radio.addEventListener("change", () => {

        if (currentMusic) {
            currentMusic.pause();
            currentMusic.currentTime = 0;
        }

        currentMusic = musicTracks[radio.value];

        currentMusic.volume =
            parseFloat(document.getElementById("musicVolume").value);

        currentMusic.play().catch(err => console.log(err));
    });

});

document.getElementById("stopMusic").addEventListener("click", () => {

    if (currentMusic) {
        currentMusic.pause();
        currentMusic.currentTime = 0;
    }

    currentMusic = null;

    document.querySelectorAll('input[name="music"]').forEach(radio => {
        radio.checked = false;
    });

});

document.getElementById("musicVolume")
.addEventListener("input",(e)=>{
    if(currentMusic){
        currentMusic.volume=e.target.value;
    }
});

function setupAmbience(id,key){

    const slider=document.getElementById(id);
    const audio=ambience[key];

    slider.addEventListener("input",(e)=>{

        let vol=parseFloat(e.target.value);

        audio.volume=vol;

        if(vol>0 && audio.paused){
            audio.play();
        }

        if(vol===0){
            audio.pause();
            audio.currentTime=0;
        }
    });
}

setupAmbience("rain","rain");
setupAmbience("darkRain","darkRain");
setupAmbience("fireplace","fireplace");
setupAmbience("vinyl","vinyl");

/* Floating particles */

const canvas=document.getElementById("particles");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

const particles=[];

for(let i=0;i<80;i++){
    particles.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        r:Math.random()*2+1,
        speed:Math.random()*0.4+0.1
    });
}

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="rgba(255,245,220,0.25)";

    particles.forEach(p=>{

        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();

        p.y-=p.speed;

        if(p.y<0){
            p.y=canvas.height;
            p.x=Math.random()*canvas.width;
        }
    });

    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize",()=>{
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
});
/*************************
CUSTOM TIMER
*************************/

let timer;
let remainingSeconds = 1500;
let isRunning = false;

const timerInput =
document.getElementById("timerInput");

const timerDisplay =
document.getElementById("timerDisplay");

function updateDisplay(){

    let mins =
    Math.floor(remainingSeconds / 60);

    let secs =
    remainingSeconds % 60;

    timerDisplay.textContent =
        `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
}

timerInput.addEventListener("change",()=>{

    remainingSeconds =
    parseInt(timerInput.value) * 60;

    updateDisplay();
});

document.getElementById("startTimer")
.addEventListener("click",()=>{

    if(isRunning) return;

    isRunning = true;

    timer = setInterval(()=>{

        if(remainingSeconds > 0){

            remainingSeconds--;
            updateDisplay();

        }else{

            clearInterval(timer);

            isRunning = false;

            alert("Focus session completed!");
        }

    },1000);

});

document.getElementById("pauseTimer")
.addEventListener("click",()=>{

    clearInterval(timer);
    isRunning = false;
});

document.getElementById("resetTimer")
.addEventListener("click",()=>{

    clearInterval(timer);

    isRunning = false;

    remainingSeconds =
    parseInt(timerInput.value) * 60;

    updateDisplay();
});

updateDisplay();