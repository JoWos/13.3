'use strict';

//OUTPUTS
var output = document.getElementById('output');
var result = document.getElementById('result');

//BUTTONS
var paper = document.getElementById('paper');
var rock = document.getElementById('rock');
var scissors = document.getElementById('scissors');
var newGame = document.getElementById('start');
var buttons = document.querySelectorAll('.player-move');

//VARIABLES
var params = {
  playerScore: 0,
  computerScore: 0,
  roundNumber: 0,
  maxRounds: 0,
  progress: [],
};

// BLOKOWANIE PRZYCISKÓW
function disableButtons (isDisabled) {
  paper.disabled = isDisabled;
  rock.disabled = isDisabled; 
  scissors.disabled = isDisabled;
}

// MODALE
var showModal = function(event){
  event.preventDefault();
  document.querySelector('#modal-overlay').classList.add('show');	

  var modals = document.querySelectorAll('.modal');
  for (var i = 0; i < modals.length; i++) {
  modals[i].classList.remove('show');
  }
 
  document.querySelector('#modal-one').classList.add('show');
};


var hideModal = function(event){
  event.preventDefault();
  document.querySelector('#modal-overlay').classList.remove('show');
};

var closeButtons = document.querySelectorAll('.modal .close');

for(var i = 0; i < closeButtons.length; i++){
  closeButtons[i].addEventListener('click', hideModal);
}

document.querySelector('#modal-overlay').addEventListener('click', hideModal);

var modals = document.querySelectorAll('.modal');

for(var i = 0; i < modals.length; i++){
  modals[i].addEventListener('click', function(event){
    event.stopPropagation();
  });
}; 

//RESET WYNIKU RUNDY
function resetScore(){
  result.innerHTML = 'You vs Computer';
}

//POKAZYWANIE WYNIKU CAŁEJ GRY
var showGameResult = function(){
  var info = document.getElementById('info');
   if(params.playerScore == params.maxRounds) {
  info.innerHTML = 'Game over! <br> YOU WON the entire game!'
    showModal(event);
 } else if (params.computerScore == params.maxRounds) {
  info.innerHTML = 'Game over! <br> You lost the entire game!'
    showModal(event);
 }
}

//SPRAWDZANIE CZY GRA SIĘ ZAKOŃCZYŁA
function isGameOver(){
  showGameResult();
  
 if(params.playerScore == params.maxRounds || params.computerScore == params.maxRounds) {
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
  result.innerHTML =  'You need ' + params.maxRounds + ' points to win <br> Round number: ' + params.roundNumber + ':  <br> You ' + params.playerScore + ' : ' + params.computerScore + ' Computer';
  }


//KTO WYGRYWA RUNDĘ
function winner(playerChoice, computerChoice) {
  var showWinner;
  if (playerChoice == computerChoice) {
    showWinner = 'It\'\s a DRAW';
  } else if (playerChoice == 'paper' && computerChoice == 'rock') {
    showWinner = 'YOU WON';
    params.playerScore++;
  } else if (playerChoice == 'rock' && computerChoice == 'scissors') {
    showWinner ='YOU WON';
    params.playerScore++;
  } else if (playerChoice == 'scissors' && computerChoice == 'paper') {
    showWinner = 'YOU WON';
    params.playerScore++;
  } else {
    showWinner = 'YOU LOST';
    params.computerScore++;
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
  params.roundNumber++;
};


//BUTTONS
for(var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function(){
    playerMove(this.getAttribute('data-move'));
  })
} 


//INICJACJA NOWEJ GRY
newGame.addEventListener('click', function() {
  params.maxRounds = window.prompt("How many rounds to win?");
  
    if(isNaN(params.maxRounds) || params.maxRounds == null || params.maxRounds == '') {
    output.innerHTML = "Incorrect number";
  } else {
    resetScore();
    params.roundNumber=1;
    params.playerScore=0;
    params.computerScore=0;
    disableButtons(false)
   
    output.innerHTML = 'You win the entire game if you win ' + params.maxRounds + ' rounds';

}
});

disableButtons(true);