//Global variables
var guessedLettersText = document.getElementById("guessed-letters-text"); //these are the incorrect letters guessed by the user
var guessesLeftText = document.getElementById("guesses-left"); //how many guesses the user has left. Starts at 10
var winsText = document.getElementById("wins-text"); //how many times the user has guessed a correct word
var lossesText = document.getElementById("losses-text"); //how many times the user has used up all 10 guesses and not gotten the word correctly
var placeholder = document.getElementById("placeholder-text"); //placeholder to show the secret word
var newGameButton = document.getElementById("new-game"); //the only button in the game. This starts the game
var alertGameNotRunning = document.getElementById("game-not-running"); //used if a user tries to pick a letter before pressing start game
var letterAlreadyPicked = document.getElementById("letter-already-picked");//used in case the user picks a repeated letter
var gameOver = document.getElementById("game-over");
var youWin = document.getElementById("you-win");

//creates an array of words the computer will pick from
var hpWords = ["hogwarts", "hagrid", "gringotes", "voldemort", "weasley", "horcruxes", "testrals", "patronum", "leviosa", "aragorn", "harry potter", "snitch", "quidditch", "muggles"]

//more global variables
var wins = 0; //wins start at 0
var losses = 0;//same for losses
var guessesLeft = 10;//the user will have 10 guesses to try and guess the word
var gameRunning = false;//sets the game to not started
var computerWord = '';//the word picked by the computer
var computerWordPlaceHolder = [];//an array to hold the letters to the secret word
var correctGuesses = [];//an array to hold the user's correct letters. Will be used to compare to the computer's word
var incorrectGuesses = [];//array to hold the incorrect letters and show it back on the HTML


// Game sounds
var newGameSound = new Audio("/Users/talktopri 1/Desktop/UCF-BootCamp/word-guess-game/assets/sounds/newGameSound.mov");
var winSound = new Audio("/Users/talktopri 1/Desktop/UCF-BootCamp/word-guess-game/assets/sounds/winSound.mov")

//this starts the game. Sets all values to empty when applicable, or to their initial values (like guessesLeft)
function newGame () {
    newGameSound.play();
    gameRunning = true;
    guessesLeft = 10;
    guessedLetters = [];
    incorrectGuesses = [];
    computerWordPlaceHolder = [];
    letterAlreadyPicked.textContent = "";
    alertGameNotRunning.textContent = "";

//this is where the user picks a random word    
    computerWord = hpWords[Math.floor(Math.random() * hpWords.length)];
    console.log(computerWord);

//here we will create placeholders that match the computerWord characters.
    for (var i = 0; i < computerWord.length; i++) { //as long as i is less than the length of computerWord...
        if (computerWord[i] === " ") { //check if the character in computerWord is a space
            computerWordPlaceHolder.push(" "); //if it is, replace it with a space
        } else {
            computerWordPlaceHolder.push(" _ "); //otherwise, replace it with a _.
        }
    }
    //display things on the DOM
    guessesLeftText.textContent = guessesLeft; 
    placeholder.textContent = computerWordPlaceHolder.join('');
    guessedLettersText.textContent = incorrectGuesses;
    
}

//here we will check if the user's guessed letter matches the computerWord
function letterGuess(letter) {
    console.log(letter);

    if (gameRunning === true && guessedLetters.indexOf(letter) === -1) { //if the game is running AND the user's letter has NOT been picked, do the following:
        guessedLetters.push(letter);
        
        for (var i = 0; i < computerWord.length; i++) { //for each i that is less than the length of computerWord...
            if (computerWord[i].toLowerCase() === letter.toLowerCase()) { //...check if the user letter in lower case matches a letter within computerWord in lowe case...
                computerWordPlaceHolder[i] = computerWord[i]; //if it matches, they are equivalent...
                letterAlreadyPicked.textContent = "";//...and this alert for letters already picked should not be visible and...
            }
        }
        
        placeholder.textContent = computerWordPlaceHolder.join(''); //...we display the correct letter on the DOM
        checkIncorrect(letter); //call the checkIncorrect function to make sure the letter is correct
    
    }
    else { //otherwise, if the user's letter has already been guessed OR if the game is not running, display the following on the DOM:
        if (!gameRunning) {
            alertGameNotRunning.textContent = "You haven't started a game. Please press New Game to start guessing";
        }
        else {
            letterAlreadyPicked.textContent = "You have already picked this letter. Try a new one!";
        }
        
    }
}

//checking the user's letter
function checkIncorrect (letter) {
    if (computerWordPlaceHolder.indexOf(letter.toLowerCase()) === -1) { //if the user letter to lower case does not exist within the array created to hold the computerWord (aka doesn't match the computerWord) then...
    guessesLeft--;// reduce the amount of guesses left 
    incorrectGuesses.push(letter);//push the incorrect letter to the incorrectGuesses array and...
    guessedLettersText.textContent = incorrectGuesses.join(' '); //display both incorrect letters and...
    guessesLeftText.textContent = guessesLeft; // new amount of guesses left on the DOM
    }
checkLoss(); //check if loss happened
}

function checkLoss() {
    if (guessesLeft === 0) { //if there are no more guesses left...
        losses++; //then increase the amount of losses
        gameRunning = false; //stop the game...
        lossesText.textContent = losses; //...update the DOM display... 
        placeholder.textContent = computerWord; //and reveal the secret word
        alert("No legilimency power? Go get your muggleshot! Game Over!");
    }
checkWin(); //check if win happened
}

function checkWin() {
    if (computerWord.toLowerCase() === computerWordPlaceHolder.join('').toLowerCase()) { //if the string of letters within the placeholder array to lower case matches the computerWord, then...
        wins++; //...increase the wins...
        gameRunning = false; //...stop the game...
        winsText.textContent = wins; //...update the DOM...
        winSound.play(); //...and play a victorious sound
        alert("You're a wizard! You win!");

    }
}


newGameButton.addEventListener("click", newGame); //this is the button that starts the game. It calls the newGame function at the top.

document.onkeyup = function(event) { //the a keyboard key is pressed...
    if (event.keyCode >= 65 && event.keyCode <= 90) { //...check if the pressed key is between A and Z only (we don't consider shift, enter, esc, etc). If it is, then...
        letterGuess(event.key); //call the letterGuess function to start comparing the key pressed against the computerWord.
    }
}