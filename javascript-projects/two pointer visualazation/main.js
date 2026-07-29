import twoPointerLogic, {
  togglePauseState,
  resetSimulationState,
} from "./twoPointerLogic.js";

addEventListener("DOMContentLoaded", function () {
  // DOM elements fetching
  let textValue = document.getElementById("input-ele");
  let targetValue = document.getElementById("target-element");
  let startBtn = document.getElementById("start-btn");
  let pauseBtn = document.getElementById("pause-btn");
  let resultContainer = document.getElementById("array-res");

  // FIX 1: Independent Pause Button Logic with State Signal Toggling
  pauseBtn.addEventListener("click", function () {
    // Ye function twoPointerLogic file ke andar ka flag change karega aur return karega current state
    const currentPauseState = togglePauseState();

    if (currentPauseState) {
      pauseBtn.innerText = "Resume";
      pauseBtn.classList.add("resume-state"); // Hamare style.css ka premium glow effect lagayega
    } else {
      pauseBtn.innerText = "Pause";
      pauseBtn.classList.remove("resume-state");
    }
  });

  // Start Button Click Handler
  startBtn.addEventListener("click", async function () {
    let stringValue = textValue.value;
    let targetNumber = targetValue.value;

    const str = stringValue.split(",");
    const arr = [];
    const target = parseInt(targetNumber);

    if (isNaN(target)) {
      alert("Please enter a valid target value.......");
      return;
    }

    for (let ch of str) {
      let num = ch.trim();
      if (isNaN(num) || num === "") {
        alert("Please enter valid array elements ...");
        return;
      }
      arr.push(parseInt(num));
    }

    // Refresh flags on every new fresh simulation run
    resetSimulationState();
    pauseBtn.innerText = "Pause";
    pauseBtn.classList.remove("resume-state");

    // Toggle active state on simulation boot
    pauseBtn.disabled = false;
    startBtn.disabled = true;

    // Execute the async logic engine
    await twoPointerLogic(arr, target);

    // Reset inputs & buttons once the loop terminates successfully
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.innerText = "Pause";
    textValue.value = "";
    targetValue.value = "";
    resultContainer.innerHTML = '';
  });
});
