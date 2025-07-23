// Original paragraph
const paragraph = `Creativity is a vital force in human progress, shaping societies and fueling advancements in various fields.`;

// Function to reverse words correctly
function reverseWord(word) {
    let punctuation = "";
    if (",.!?".includes(word[word.length - 1])) {
        punctuation = word[word.length - 1];
        word = word.slice(0, -1);
    }
    return word.split("").reverse().join("") + punctuation;
}

// Generate the correct reversed paragraph
const reversedWords = paragraph.split(" ").map(reverseWord);
const inputField = document.getElementById("userInput");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const accuracyElement = document.getElementById("accuracy");

// Timer Variables
let timeLeft = 30 * 60;
let startTime = null;

// Check Typing Accuracy
function checkTyping() {
    if (!startTime) return; // Ensure timer has started

    const userWords = inputField.value.trim().split(/\s+/);
    let correctCount = 0;
    let errorPositions = [];

    reversedWords.forEach((word, index) => {
        if (userWords[index] === word) {
            correctCount++;
        } else {
            errorPositions.push(index + 1);
        }
    });

    let accuracy = (correctCount / reversedWords.length) * 100;
    let timeTaken = (30 * 60) - timeLeft;
    let speedBonus = Math.max(0, 500 - timeTaken);
    let finalScore = Math.round((accuracy * 10) + speedBonus);

    resultElement.innerHTML = errorPositions.length === 0 ? 
        "✅ Perfect! No errors found." : 
        `❌ You made errors at positions: ${errorPositions.join(", ")}`;
    scoreElement.innerHTML = `🏆 Score: ${finalScore}`;
    accuracyElement.innerHTML = `📊 Accuracy: ${accuracy.toFixed(2)}%`;

    resultElement.classList.toggle("correct", errorPositions.length === 0);
    resultElement.classList.toggle("incorrect", errorPositions.length > 0);
}

// Timer Function
function startTimer() {
    startTime = Date.now();
    const timerElement = document.getElementById("timer");
    const timerInterval = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerElement.textContent = `Time Left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "⏳ Time's up!";
            alert("Time's up! Competition over.");
            inputField.disabled = true;
            checkTyping();
        }
    }, 1000);
}

// Start timer on input
inputField.addEventListener("focus", () => {
    if (!startTime) startTimer();
});
