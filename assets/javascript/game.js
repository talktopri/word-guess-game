var guessedLettersText = document.getElementById("guessed-letters-text");
var guessesLeftText = document.getElementById("guesses-left");
var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");
var placeholder = document.getElementById("placeholder-text");
var newGameButton = document.getElementById("new-game");
var alertGameNotRunning = document.getElementById("game-not-running");
var letterAlreadyPicked = document.getElementById("letter-already-picked");

var hpWords = ["hogwarts", "hagrid", "gringotes", "voldemort", "weasley", "horcruxes", "testrals", "patronum", "leviosa", "aragorn", "harry potter"] //possible computer picks

var wins = 0;
var losses = 0;
var guessesLeft = 10;
var gameRunning = false;
var computerWord = '';
var computerWordPlaceHolder = [];
var correctGuesses = [];
var incorrectGuesses = [];

function newGame () {
    gameRunning = true;
    guessesLeft = 10;
    guessedLetters = [];
    incorrectGuesses = [];
    computerWordPlaceHolder = [];

    computerWord = hpWords[Math.floor(Math.random() * hpWords.length)];
    console.log(computerWord);

    for (var i = 0; i < computerWord.length; i++) {
        if (computerWord[i] === " ") {
            computerWordPlaceHolder.push(" ");
        } else {
            computerWordPlaceHolder.push(" _ ");
        }
    }
    guessesLeftText.textContent = guessesLeft;
    placeholder.textContent = computerWordPlaceHolder.join('');
    guessedLettersText.textContent = incorrectGuesses;
}

function letterGuess(letter) {
    console.log(letter);

    if (gameRunning === true && guessedLetters.indexOf(letter) === -1) {
        guessedLetters.push(letter);
        
        for (var i = 0; i < computerWord.length; i++) {
            if (computerWord[i].toLowerCase() === letter.toLowerCase()) {
                computerWordPlaceHolder[i] = computerWord[i];
            }
        }
        
        placeholder.textContent = computerWordPlaceHolder.join('');
        checkIncorrect(letter);
    
    }
    else {
        if (!gameRunning) {
            alertGameNotRunning.textContent = "You haven't started a game. Please press New Game to start guessing";
        }
        else {
            letterAlreadyPicked.textContent = "You have already picked this letter. Try a new one!";
        }
        
    }
}

function checkIncorrect (letter) {
    if (computerWordPlaceHolder.indexOf(letter.toLowerCase()) === -1) {
    guessesLeft--;
    incorrectGuesses.push(letter);
    guessedLettersText.textContent = incorrectGuesses.join(' ');
    guessesLeftText.textContent = guessesLeft;
    }
checkLoss();
}

function checkLoss() {
    if (guessesLeft === 0) {
        losses++;
        gameRunning = false;
        lossesText.textContent = losses;
        placeholder.textContent = computerWord;
    }
checkWin();    
}

function checkWin() {
    if (computerWord.toLowerCase() === computerWordPlaceHolder.join('').toLowerCase()) {
        wins++;
        gameRunning = false;
        winsText.textContent = wins;
    }
}


newGameButton.addEventListener("click", newGame);

document.onkeyup = function(event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        letterGuess(event.key);
    }
}