let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let stopped = true;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTimer, 1000);
        running = true;
        stopped = false;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    display.innerHTML = '00:00:00';
    difference = 0;
    running = false;
    stopped = true;
    laps.innerHTML = '';
}

function updateTimer() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor(difference / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    display.innerHTML = `${hours}:${minutes}:${seconds}`;
}

function addLap() {
    if (!stopped) {
        const lapTime = document.createElement('li');
        lapTime.innerHTML = display.innerHTML;
        laps.appendChild(lapTime);
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', addLap);
