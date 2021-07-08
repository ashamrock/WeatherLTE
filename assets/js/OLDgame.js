$(document).ready(function() {
    
var wins = " ";
var losses = " ";
var guesses = 10;
var letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var guessed = [];
var compGuess = letters[Math.floor(Math.random() * letters.length)];
console.log(compGuess)    
  
document.onkeydown = function (event) {  
      var yourguess = event.key;
//how do i loop the variable/function compGuess without having to put it in the if statement
if (yourguess !== compGuess) {
guesses--;
}else{
guessed = [];
guesses = 10;
wins++;
compGuess = letters[Math.floor(Math.random() * letters.length)];
console.log(compGuess);
}
if (guesses == 0) {
guessed = []
guesses = 10;
losses++;
compGuess = letters[Math.floor(Math.random() * letters.length)];
console.log(compGuess);
}

guessed.push(yourguess);
document.getElementById('wins').innerHTML = wins;
document.getElementById('losses').innerHTML = losses;
document.getElementById('guesses').innerHTML = guesses;      
document.getElementById('guessed').innerHTML = guessed;

}

});
