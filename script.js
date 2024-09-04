"use strict";
const lapContainer = document.querySelector(".lap_lists");

const startButton = document.querySelector(".startButton");
const stopButton = document.querySelector(".stopButton");
const pauseButton = document.querySelector(".pauseButton");
const resetButton = document.querySelector(".resetButton");

const milliSecondsLabel = document.querySelector(".milliseconds-label");
const secondsLabel = document.querySelector(".seconds-label");
const minutesLabel = document.querySelector(".minutes-label");

let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let interval;

function updateButton(start = true, pause = false, stop = false) {
  startButton.disabled = start;
  pauseButton.disabled = pause;
  stopButton.disabled = stop;
}
// Start Event
startButton.addEventListener("click", function () {
  // disable the button first
  updateButton();

  function timer() {
    if (milliseconds === 99) {
      milliseconds = 0;
      // milliSecondsLabel.textContent = padTime(milliseconds);
      updateDOM(milliSecondsLabel, milliseconds);

      seconds++;
      // secondsLabel.textContent = padTime(seconds);
      updateDOM(secondsLabel, seconds);

      if (seconds === 60) {
        seconds = 0;
        // secondsLabel.textContent = padTime(seconds);
        updateDOM(secondsLabel, seconds);

        minutes++;
        // minutesLabel.textContent = padTime(minutes);
        updateDOM(minutesLabel, minutes);
      }
    }

    milliseconds++;
    // milliSecondsLabel.textContent = padTime(milliseconds);
    updateDOM(milliSecondsLabel, milliseconds);
  }

  interval = setInterval(timer, 10);
});

// Pause Event
pauseButton.addEventListener("click", function () {
  clearInterval(interval);

  startButton.disabled = false;
});

// Reset Event
resetButton.addEventListener("click", function () {
  startButton.disabled = false;

  milliseconds = 0;
  seconds = 0;
  minutes = 0;

  // secondsLabel.textContent = padTime(seconds);
  // milliSecondsLabel.textContent = padTime(milliseconds);
  // minutesLabel.textContent = padTime(minutes);

  updateDOM(secondsLabel, seconds);
  updateDOM(milliSecondsLabel, milliseconds);
  updateDOM(minutesLabel, minutes);

  clearInterval(interval);
});

const laps = [];
stopButton.addEventListener("click", function () {
  clearInterval(interval);

  const newLap = {
    min: minutes,
    sec: seconds,
    milli: milliseconds,
  };

  // startButton.disabled = false;
  // pauseButton.disabled = true;
  // stopButton.disabled = true;
  updateButton(false, true, true);

  laps.push(newLap);

  renderLap();
});

// Render Lap
function renderLap() {
  lapContainer.innerHTML = "";
  laps.forEach(function (lap, index) {
    const html = `
        <li class="lap">
          <span>Lap ${index + 1}:</span>
          <span>${padTime(lap.min)}:${padTime(lap.sec)}:${padTime(
      lap.milli
    )}</span>
        </li>
    `;

    lapContainer.insertAdjacentHTML("afterbegin", html);
  });
}

function updateDOM(element, time) {
  element.textContent = padTime(time);
}

// .PADSTARTING TIME
function padTime(time) {
  return time.toString().padStart(2, "0");
}
