'use strict';

//OUTPUTS
var output = document.getElementById('output');
var result = document.getElementById('result');


//BUTTONS
var paper = document.getElementById('paper');
var rock = document.getElementById('rock');
var scissors = document.getElementById('scissors');
var newGame = document.getElementById('start')

//VARIABLES
var playerScore = 0;
var computerScore = 0;
var maxRounds = 0;
var roundNumber = 0;

// BLOKOWANIE PRZYCISKÓW
function disableButtons (isDisabled) {
  paper.disabled = isDisabled;
  rock.disabled = isDisabled;
  scissors.disabled = isDisabled;
}

//RESET WYNIKU RUNDY
function resetScore(){
  result.innerHTML = 'You vs Computer';
}

//POKAZYWANIE WYNIKU CAŁEJ GRY
var showGameResult = function(){
   if(playerScore == maxRounds) {
  output.innerHTML = 'Game over! <br> YOU WON the entire game!'
 } else if (computerScore == maxRounds) {
  output.innerHTML = 'Game over! <br> you lost the entire game!'
 }
}

//SPRAWDZANIE CZY GRA SIĘ ZAKOŃCZYŁA
function isGameOver(){
showGameResult();
  
 if(playerScore == maxRounds || computerScore == maxRounds) {
  disableButtons(true);
   return true;
  } else {
    return false;
  }
}


//LOSOWANIE RUCHU KOMPUTERA
function getComputerChoice() {   
  return ['PAPER', 'ROCK', 'SCISSORS'][Math.floor(Math.random() * 3)];
};

//POKAZYWANIE PUNKTÓW KAŻDEGO Z GRACZY PO ZAKOŃCZONEJ RUNDZIE, NUMERU RUNDY I INFO O ILOŚCI PUNKTÓW POTRZEBNYCH DO WYGRANEJ
function showScore() {
  result.innerHTML = 'You need ' + maxRounds + ' points to win <br> Round number: ' + roundNumber + '<br> You ' + playerScore + ' : ' + computerScore + ' Computer';
}


//KTO WYGRYWA RUNDĘ
function winner(playerChoice, computerChoice) {
  var showWinner;
  if (playerChoice == computerChoice) {
    showWinner = 'It\'\s a DRAW';
  } else if (playerChoice == 'PAPER' && computerChoice == 'ROCK') {
    showWinner = 'YOU WON';
    playerScore++;
  } else if (playerChoice == 'ROCK' && computerChoice == 'SCISSORS') {
    showWinner ='YOU WON';
    playerScore++;
  } else if (playerChoice == 'SCISSORS' && computerChoice == 'PAPER') {
    showWinner = 'YOU WON';
    playerScore++;
  } else {
    showWinner = 'YOU LOST';
    computerScore++;
  }
  showScore()
  if(!isGameOver()) {
  output.innerHTML =  showWinner + ': you played ' + playerChoice + ', computer played ' + computerChoice;
  } 
}

//PLAYER MOVE = losowanie + wynik
function playerMove(playerChoice) {
  var computerChoice = getComputerChoice()
  winner(playerChoice, computerChoice);
  roundNumber++;
};


//PAPER BUTTON
paper.addEventListener('click', function(){
  playerMove('PAPER');
});

//ROCK BUTTON
rock.addEventListener('click', function(){
  playerMove('ROCK');
});

//SCISSORS BUTTON
scissors.addEventListener('click', function(){
  playerMove('SCISSORS');
});


//INICJACJA NOWEJ GRY
newGame.addEventListener('click', function() {
  maxRounds = window.prompt("How many rounds to win?");
  
   if(isNaN(maxRounds) || maxRounds == null || maxRounds == '') {
    output.innerHTML = "Incorrect number";
  } else {
    resetScore();
    roundNumber = 1;
    playerScore = 0;
    computerScore = 0;
    disableButtons(false);
   
    output.innerHTML = 'You win the entire game if you win ' + maxRounds + ' rounds';
}
});

disableButtons(true);