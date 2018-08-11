/*
CHALLENGES:
1. A player looses his entire score when he rolls two 6 in a row. After that it's the next player turn.
2. Add an input field to the HTML where player can set predefined wining score.
3. Add another dice to the game, so now there are 2 dices. The player looses his current score when one of them is 1.
*/
var scores, roundScore, activePlayer, isGamePlaying, lastDice;

init();

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (!isGamePlaying) return;
  //1.random number
  var dice1 = Math.floor(Math.random() * 6) + 1;
  var dice2 = Math.floor(Math.random() * 6) + 1;
  //2. display the result
  document.getElementById("dice1").style.display = "block";
  document.getElementById("dice2").style.display = "block";
  document.getElementById("dice1").src = "dice-" + dice1 + ".png";
  document.getElementById("dice2").src = "dice-" + dice2 + ".png";

  /* if (dice === 6 && lastDice === 6) {
     console.log(dice);
     scores[activePlayer] = 0;
     document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
     isGamePlaying = false;
     //allowing dice-6 to be displayed
     setTimeout(nextPlayer, 1000);
   }*/
  //3. Update the round score only if rolled number is not 1
  if (dice1 !== 1 && dice2 !== 1) {
    //addScore
    roundScore += dice1 + dice2;
    //lastDice = dice;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
    isGamePlaying = false;
    //allowing dice-1 to be displayed
    setTimeout(nextPlayer, 1000);
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (!isGamePlaying) return;
  //add current score to user global score
  scores[activePlayer] += roundScore;
  //update UI
  document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
  document.getElementById("current-" + activePlayer).textContent = "0";

  var winningScore;
  var input = document.querySelector(".winning-score").value;
  winningScore = input ? input : 100;
  //check if player won the game
  if (scores[activePlayer] >= winningScore) {
    document.getElementById("name-" + activePlayer).textContent = "Winner!";
    document.getElementById("dice1").style.display = "none";
    document.getElementById("dice2").style.display = "none";
    document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
    document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
    isGamePlaying = false;
  } else {
    //next player
    nextPlayer();
  }
});
document.querySelector(".btn-new").addEventListener("click", init);

function nextPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  roundScore = 0;
  isGamePlaying = true;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.getElementById("dice1").style.display = "none";
  document.getElementById("dice2").style.display = "none";
}

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  isGamePlaying = true;

  document.getElementById("dice1").style.display = "none";
  document.getElementById("dice2").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2 ";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  // document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
