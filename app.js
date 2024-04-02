var stopwatch = {
  startTime: 0,
  running: false,
  lapTimes: [],
  interval: null,
};

function start() {
  if (!stopwatch.running) {
    stopwatch.startTime = Date.now() - getElapsed();
    stopwatch.interval = setInterval(updateDisplay, 10);
    stopwatch.running = true;
  }
}

function pause() {
  if (stopwatch.running) {
    clearInterval(stopwatch.interval);
    stopwatch.running = false;
  }
}

function reset() {
  clearInterval(stopwatch.interval);
  stopwatch.startTime = 0;
  stopwatch.lapTimes = [];
  stopwatch.running = false;
  updateDisplay();
  clearLaps();
}

function lap() {
  if (stopwatch.running) {
    var elapsed = getElapsed();
    stopwatch.lapTimes.push(elapsed);
    displayLap(elapsed);
  }
}

function getElapsed() {
  return Date.now() - stopwatch.startTime;
}

function formatTime(time) {
  var milliseconds = Math.floor((time % 1000) / 10);
  var seconds = Math.floor((time / 1000) % 60);
  var minutes = Math.floor((time / 60000) % 60);
  return pad(minutes) + ":" + pad(seconds) + ":" + pad(milliseconds);
}

function pad(num) {
  return ("0" + num).slice(-2);
}

function updateDisplay() {
  document.getElementById("display").textContent = formatTime(getElapsed());
}

function displayLap(time) {
  var lapItem = document.createElement("li");
  lapItem.textContent = formatTime(time);
  document.getElementById("laps").appendChild(lapItem);
}

function clearLaps() {
  var lapsContainer = document.getElementById("laps");
  while (lapsContainer.firstChild) {
    lapsContainer.removeChild(lapsContainer.firstChild);
  }
}
