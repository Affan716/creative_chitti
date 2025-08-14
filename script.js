// script.js
let total = 0;

// Create an instance of the AdvancedMathChallengeAI class
const creativeChittiAI = new AdvancedMathChallengeAI();

function addNumber(num) {
    total += num;
    document.getElementById("display").textContent = total;

    // Check if an AI exercise is active and pass the clicked value to it
    if (creativeChittiAI.exerciseActive) {
        creativeChittiAI.onCalculatorClick(num);
    }
}

function resetCalculator() {
    total = 0;
    document.getElementById("display").textContent = total;
}

// ---------------------------
// AI Challenge Functions
// ---------------------------

function startNewChallenge() {
    // Before starting a new challenge, reset the main calculator display
    resetCalculator();
    // Then, tell the AI to generate and start a new exercise
    creativeChittiAI.generateAdvancedExercise();

    // Enable the check answer and hint buttons
    document.getElementById("check-answer-btn").disabled = false;
    document.getElementById("hint-btn").disabled = false;
}

function submitAnswer() {
    // Pass the current total from the main calculator to the AI to check
    creativeChittiAI.currentTotal = total;
    creativeChittiAI.checkAnswer();

    // After an answer is submitted, disable the check answer and hint buttons
    document.getElementById("check-answer-btn").disabled = true;
    document.getElementById("hint-btn").disabled = true;
}

function requestHint() {
    creativeChittiAI.showAdvancedHint();
}

// Add a function to disable all calculator buttons (as required by the AI class)
function disableCalculatorButtons() {
    document.querySelectorAll('.buttons button').forEach(btn => {
        btn.disabled = true;
    });
}

// Add a function to enable all calculator buttons (as required by the AI class)
function enableCalculatorButtons() {
    document.querySelectorAll('.buttons button').forEach(btn => {
        btn.disabled = false;
    });
}