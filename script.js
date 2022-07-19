"use strict";
//All Global variables here
//-----------
let score0 = 0;
let score1 = 0;
let currentScore0 = 0;
let currentScore1 = 0;
let activePlayer = 0;
let playing = true;
//----------

//----------
//Getting Score and player elememts
const score0El = document.getElementById("score_0");
const score1El = document.getElementById("score_1");
//Getting currentScore element
const current0El = document.getElementById("current_0");
const current1El = document.getElementById("current_1");
const player0El = document.querySelector(".player_0");
const player1El = document.querySelector(".player_1");
//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
//----------

//----------
//Getting dice Image element
const diceEl = document.querySelector(".dice");
//initially hiding dice
diceEl.classList.add("hidden");
//--------

//-------------------------------------------
//Working with all three buttons
const btnNew = document.querySelector(".btn_new");
const btnRoll = document.querySelector(".btn_roll");
const btnHold = document.querySelector(".btn_hold");

btnNew.addEventListener("click", newGame);
btnRoll.addEventListener("click", diceRolled);
btnHold.addEventListener("click", Hold);

function diceRolled() {
  if (playing) {
    //1. Generating a random dice Roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display Dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    console.log(dice);

    //3. Check for rolled 1
    if (dice !== 1) {
      //Add dice to current score
      let val = 0;
      val =
        activePlayer === 0 ? (currentScore0 += dice) : (currentScore1 += dice);

      document.getElementById(`current_${activePlayer}`).textContent = val;
    } else {
      // Switch to next player
      activePlayer === 0 ? (currentScore0 = 0) : (currentScore1 = 0);
      document.getElementById(`current_${activePlayer}`).textContent = 0;
      switchPlayer();
    }
  }
}

function newGame() {
  currentScore0 = 0;
  currentScore1 = 0;
  score0 = 0;
  score1 = 0;
  activePlayer = 0;
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player_active");
  player1El.classList.remove("player_active");
  diceEl.classList.add(".hidden");
}
function Hold() {
  //1. Add current score to active player's score
  if (score0 < 100 && score1 < 100) {
    if (activePlayer === 0) {
      score0 += currentScore0;
      score0El.textContent = score0;
      currentScore0 = 0;
      current0El.textContent = currentScore0;
    } else {
      score1 += currentScore1;
      score1El.textContent = score1;
      currentScore1 = 0;
      current1El.textContent = currentScore1;
    }
  }
  //2. Check if player's score is >= 100
  if (score0 >= 100 || score1 >= 100) {
    // Finish the game
    winGame();
  } else {
    //Switch to the next player
    switchPlayer();
  }
}

//---------------------------------------------------

//----------------------------
// Non-Button functions
function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player_active");
  player1El.classList.toggle("player_active");
}

function winGame() {
  document
    .querySelector(`.player_${activePlayer}`)
    .classList.add("player--winner");

  document
    .querySelector(`.player_${activePlayer}`)
    .classList.remove("player-active");
  playing = false;
  document.getElementById(`score_${activePlayer}`).textContent = "You Won";
  document.getElementById(`score_${activePlayer}`).style.fontSize = "5rem";
  document.getElementById(`score_${activePlayer}`).style.color = "#ffffff";
}

function playerWins(acvp) {
  document.querySelector("player--winner").textContent =
    "Player " + acvp + " Won 🥇";
}
//-----------------------------------
