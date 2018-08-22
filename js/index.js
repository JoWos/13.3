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
  progress: []
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

// TABELA
function myTable(){
  var tbody = document.getElementById('tbody');
  tbody.innerHTML = '';

   for(var i = 0; i < params.progress.length; i++) {
     var tr = document.createElement('tr');
 
     for(var key in params.progress[i]){
       var td = document.createElement('td');
       var text = document.createTextNode(params.progress[i][key]);
       
       td.appendChild(text);
       tr.appendChild(td);
     }
 
     tbody.appendChild(tr);
   }    
 };


//RESET WYNIKU RUNDY
function resetScore(){
  result.innerHTML = 'You vs Computer';
  params.progress = [];
}


//POKAZYWANIE WYNIKU CAŁEJ GRY w MODALU
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
  return ['paper', 'rock', 'scissors'][Math.floor(Math.random() * 3)];
};

//POKAZYWANIE PUNKTÓW KAŻDEGO Z GRACZY PO ZAKOŃCZONEJ RUNDZIE, NUMERU RUNDY I INFO O ILOŚCI PUNKTÓW POTRZEBNYCH DO WYGRANEJ
function showScore() {
  params.roundNumber++
  result.innerHTML =  'You need ' + params.maxRounds + ' points to win <br> Round number: ' + params.roundNumber + ':  <br> You ' + params.playerScore + ' : ' + params.computerScore + ' Computer';
}


//KTO WYGRYWA RUNDĘ
function showWhoWins(whoWins, playerChoice, computerChoice) {
  if (whoWins == 'computer') {
    output.innerHTML = 'You lost: you played ' + playerChoice + ', computer played ' + computerChoice;
    params.computerScore++
  } else if (whoWins == 'player') {
    output.innerHTML = 'You won: you played ' + playerChoice + ', computer played ' + computerChoice;;
    params.playerScore++
  } else {
    output.innerHTML = 'It\'\s a draw';
  }
   
  showScore();
}


//PLAYER MOVE = losowanie + wynik
function playerMove(playerChoice) {
  var computerChoice = getComputerChoice();

  var whoWins;
if (playerChoice == computerChoice) {
    whoWins = 'nobody wins';
  } else if (playerChoice == 'paper' && computerChoice == 'rock') {
    whoWins = 'player';

  } else if (playerChoice == 'rock' && computerChoice == 'scissors') {
    whoWins ='player';
    
  } else if (playerChoice == 'scissors' && computerChoice == 'paper') {
    whoWins = 'player';

  } else {
    whoWins = 'computer';
  }

  showWhoWins(whoWins, playerChoice, computerChoice);

  params.progress.push({
    round: params.roundNumber, 
    player: playerChoice,
    computer: computerChoice,
    result: whoWins, 
    playerScore: params.playerScore,   
    computerScore: params.computerScore
    })

    if(isGameOver()) {
      myTable();
      output.innerHTML = 'Let\'\s play again!';
    }
}


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
    params.roundNumber = 0;
    params.playerScore = 0;
    params.computerScore = 0;
    disableButtons(false)
   
    output.innerHTML = 'You win the entire game if you win ' + params.maxRounds + ' rounds';
  }
});

disableButtons(true);