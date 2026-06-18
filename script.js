// Global State
let array = [];
const arraySize = 10;
const animationSpeed = 800; // milliseconds per step

// DOM Elements
const arrayContainer = document.getElementById('arrayContainer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const currentSumDisplay = document.getElementById('currentSum');
const maxSumDisplay = document.getElementById('maxSum');

// Utility: Pause execution for animations
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Generate a random array with positive and negative numbers
function generateArray() {
    arrayContainer.innerHTML = '';
    array = [];
    currentSumDisplay.innerText = '0';
    maxSumDisplay.innerText = '0';

    for (let i = 0; i < arraySize; i++) {
        // Random number between -10 and 15
        const value = Math.floor(Math.random() * 26) - 10;
        array.push(value);

        // Create the visual box in the DOM
        const box = document.createElement('div');
        box.classList.add('array-box');
        box.innerText = value;
        box.id = `box-${i}`;
        arrayContainer.appendChild(box);
    }
}

// The core algorithm implementation
async function visualizeKadane() {
    // Disable buttons during visualization
    startBtn.disabled = true;
    resetBtn.disabled = true;

    let currentSum = 0;
    let maxSum = -Infinity;
    let currentStart = 0;
    let bestStart = 0;
    let bestEnd = 0;

    const boxes = document.querySelectorAll('.array-box');

    for (let i = 0; i < array.length; i++) {
        // Highlight the current element being processed
        boxes[i].classList.add('active');
        await sleep(animationSpeed);

        // Kadane's logic: start fresh or add to current contiguous sequence?
        if (currentSum + array[i] < array[i]) {
            currentSum = array[i];
            currentStart = i; // Reset the start of our current subarray
            
            // Clear previous current-subarray styling
            boxes.forEach(b => b.classList.remove('current-subarray'));
        } else {
            currentSum += array[i];
        }

        currentSumDisplay.innerText = currentSum;

        // Color the current subarray block
        for (let j = currentStart; j <= i; j++) {
            boxes[j].classList.add('current-subarray');
        }
        await sleep(animationSpeed / 2);

        // Update Max Sum if we found a new high
        if (currentSum > maxSum) {
            maxSum = currentSum;
            bestStart = currentStart;
            bestEnd = i;
            maxSumDisplay.innerText = maxSum;
        }

        // Remove the pointer highlight before moving to the next element
        boxes[i].classList.remove('active');
    }

    // Visualization complete: Highlight the final maximum subarray
    boxes.forEach(b => {
        b.classList.remove('current-subarray');
        b.classList.remove('active');
    });

    for (let j = bestStart; j <= bestEnd; j++) {
        boxes[j].classList.add('max-subarray');
    }

    // Re-enable the reset button
    resetBtn.disabled = false;
}

// Event Listeners
startBtn.addEventListener('click', visualizeKadane);
resetBtn.addEventListener('click', generateArray);

// Initialize on page load
window.onload = generateArray;