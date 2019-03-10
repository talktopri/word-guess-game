// Creates an array of possible words
    
var hpWords = ["hogwarts", "hagrid", "gringotes", "voldemort", "weasley", "horcruxes", "testrals", "patronum", "leviosa", "aragorn"]

// the computer chooses a word randomly
var computerWord = hpWords[Math.floor(Math.random() * hpWords.length)];
console.log(computerWord);

var GuessesText = document.getElementById("guesses-text");
var livesText = document.getElementById("lives-text");
livesText.textContent = "Remaining lives " + lives;
var remainingGuesses = computerWord.length;
var lives = remainingGuesses;


//Gets user's guess when the user types a letter
document.onkeyup = function(event) {
    var userLetter = event.key;
    console.log(userLetter);
}
// Creates an array to hold the users guesses
var userGuesses =  [];
for (i = 0; i < computerWord.length; i++) {
    userGuesses[i] = "_";
    console.log(userGuesses);
    
}

while (remainingGuesses > 0) {
    GuessesText.textContent = (userGuesses.join(" "));
}    

for (var w = 0; w < computerWord; w++) {
    if (computerWord[w] === userLetter) {
            userGuesses[w] = userLetter;
            remainingGuesses--;
    }
}
    
    
    



// // set variables that hold references to the places in the HTML where we want to display things.
// var winsText = document.getElementById("wins-text");
// var gameOverText = document.getElementById("gameover-text");
// var userLettersText = document.getElementById("user-letters-text");
// 
// 

// // Display the user guesses, and wins/losses/remaining guesses.
// userLettersText.textContent = "You chose: " + wrongLetter;
// 
// winsText.textContent = "Wins: " + wins;

// // Creating variables to hold the number of wins, losses, and ties. They start at 0.
// var wins = 0;
// var remainingGuesses = 10;



// var wrongLetter = [];

// // Tests if it works so far
// console.log(computerWord);




// console.log(wordDashes());




// letterHolder.forEach (function (element)) {
//     if (userLetter.contains(element)) {
//         rightLetter.push(userLetter);
//     }
// }
// if (computerWord.indexOf(userLetter) > -1) {   
//         rightLetter.push(userLetter);
//         console.log(rightLetter);
//     // replace dashes with rightLetter    
//     letterHolder[computerWord.indexOf(userLetter)] = userLetter;
//     }

//     else if (computerWord.indexOf(userLetter) === -1) {
//         wrongLetter.push(userLetter) && remainingGuesses--;
//         console.log(wrongLetter);
//     }
        

//     if (letterHolder.join('') === computerWord) {
//         alert("You Win!");
//     }

//     else if (remainingGuesses === 0) {
//         gameOverText.textContent = "Game Over!"
//     }
// }


// randomWord.textContent = 

//TO_DO
// - Make sure remainingGuesses shows correctly. Currently it shows as 10 even if I guess an incorrect letter
// - Make sure a typed letter only counts once. Currently it counts as many times as you type them
// If a word has repeated letters (like gringotes), if a user types 'g' once, it should be read once and pushed as many times as it appears to the correct place
// contains, matches, maybe a function: if there is more than one occurrence of a letter, push it that
// if wrongLetter + rightLetter = 10, remainingGuesses should be 0 and gameover
