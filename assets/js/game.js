$(document).ready(function() {
    
var wins = 0;
var losses = 0;
var guesses = 10;
var letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

                

document.onkeydown = function (event) {
      var letter = event.key.toLowerCase();

if (yourguess !== used) {
    guesses--;
    }
else{guesses = 10;
      wins++;
    }

 if (guesses == 0) {
     guesses = 10;
    losses++;
          }

}

//? function reWriteStats() {}

//?reWriteStats();


});