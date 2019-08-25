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



}

});