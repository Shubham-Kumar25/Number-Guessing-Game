let randomNumber = generateRandomNumber();
const submit = document.querySelector("#submitBtn");
const userInput = document.querySelector("#guessField");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".result-container");

const p = document.createElement("p");

let prevGuesses = [];
let numGuesses = 0;
const maxGuesses = 10;
let playGame = true;

if (playGame) {
  submit.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    validateGuess(guess);
  });
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function validateGuess(guess) {
  if (isNaN(guess) || guess < 1 || guess > 100) {
    alert("Please enter a valid number between 1 and 100");
  } else {
    prevGuesses.push(guess);
    if (numGuesses === maxGuesses) {
      displayGuess(guess);
      displayMessage(`Game Over. The correct number was ${randomNumber}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage("Congratulations! You guessed it right!");
    endGame();
  } else if (guess < randomNumber) {
    displayMessage("Too low. Try again!");
  } else if (guess > randomNumber) {
    displayMessage("Too high. Try again!");
  }
}

function displayGuess(guess) {
  userInput.value = "";
  guessSlot.innerHTML += `${guess}, `;
  numGuesses++;
  remaining.innerHTML = `${maxGuesses - numGuesses}`;
}

function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
  userInput.value = "";
  userInput.setAttribute("disabled", true);
  p.classList.add("button");
  p.innerHTML = `<h2 class="newGame" id="newGame">Start New Game</h2>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  const newGameButton = document.querySelector(".newGame");
  newGameButton.addEventListener("click", function () {
    resetGame();
  });
}

function resetGame() {
  randomNumber = generateRandomNumber();
  prevGuesses = [];
  numGuesses = 0;
  guessSlot.innerHTML = "";
  remaining.innerHTML = `${maxGuesses}`;
  userInput.removeAttribute("disabled");
  startOver.removeChild(p);
  lowOrHi.innerHTML = "";
  playGame = true;
}
