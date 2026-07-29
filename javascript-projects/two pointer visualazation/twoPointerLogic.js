import { renderArray } from "./ui.js";

// PRIVATE ENGINE STATE SIGNALS
let isPaused = false;

// Helper: Holds the execution loop time ticks
function delay(ms = 1500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// EXPORT ACTION: Toggles pause state externally from main.js clicks
export function togglePauseState() {
  isPaused = !isPaused;
  return isPaused;
}

// EXPORT ACTION: Resets internal flags when a fresh array simulation boots up
export function resetSimulationState() {
  isPaused = false;
}

// CORE ASYNC ALGORITHM ENGINE
async function twoPointerLogic(nums, target) {
  let statusDisplay = document.querySelector("#status-display");
  let size = nums.length;
  let left = 0;
  let right = size - 1;

  nums.sort((a, b) => a - b);

  while (left < right) {
    // ==========================================================
    // FIXED CRITICAL PAUSE ENGINE HOOK (ACTIVE LOOP POLLING)
    // ==========================================================
    if (isPaused) {
      statusDisplay.innerText = `[PAUSED] Simulation on hold. Click Resume to continue checking index ${left} and ${right}...`;
      await delay(200); // Check again after 200ms without consuming heavy CPU threads
      continue; // Halts the main loops progression right here!
    }

    renderArray(nums, left, right, target);
    let currentSum = nums[left] + nums[right];
    statusDisplay.innerText = `Checking Index ${left} (${nums[left]}) + Index ${right} (${nums[right]}) = ${currentSum}`;
    await delay(1500);

    // Re-verify pause state after delay to prevent unexpected jump movements
    if (isPaused) continue;

    if (currentSum == target) {
      statusDisplay.innerHTML = `<span style="color: #10b981; font-weight: bold;">Match Found! ${nums[left]} + ${nums[right]} = ${target}</span>`;
      renderArray(nums, left, right, target); // Final paint sync
      return;
    } else if (currentSum > target) {
      statusDisplay.innerText = `${currentSum} is greater than target ${target}. Moving Right pointer backward.`;
      await delay(1500);
      if (!isPaused) right--; // Only move index if user hasn't clicked pause during text display
    } else {
      statusDisplay.innerText = `${currentSum} is smaller than target ${target}. Moving Left pointer ahead.`;
      await delay(1500);
      if (!isPaused) left++;
    }
  }

  statusDisplay.innerHTML = `<span style="color: #ef4743; font-weight: bold;">No pair found matching the target value.</span>`;
}

export default twoPointerLogic;
