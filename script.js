 let randomNumber = Math.floor(Math.random() * 100) + 1;
        
        const submit = document.querySelector('#subt');
        const userInput = document.querySelector('#guessField');
        const guessSlot = document.querySelector('.guesses');
        const remaining = document.querySelector('.lastResult');
        const lowOrHi = document.querySelector('.lowOrHi');
        const newGameButton = document.querySelector('.new-game');
        
        let previousGuesses = [];
        let numGuesses = 0;
        let maxGuesses = 10;
        let playGame = true;
        
        if (playGame) {
            submit.addEventListener('click', function(e) {
                e.preventDefault();
                const guess = parseInt(userInput.value);
                validateGuess(guess);
            });
            
            newGameButton.addEventListener('click', function() {
                resetGame();
            });
        }
        
        function validateGuess(guess) {
            if (isNaN(guess) || guess < 1 || guess > 100) {
                alert('Please enter a valid number between 1 and 100.');
            } else {
                previousGuesses.push(guess);
                numGuesses++;
                
                displayGuesses();
                checkGuess(guess);
            }
        }
        
        function displayGuesses() {
            guessSlot.textContent = previousGuesses.join(', ');
            remaining.textContent = maxGuesses - numGuesses;
            userInput.value = '';
        }
        
        function checkGuess(guess) {
            if (guess === randomNumber) {
                displayMessage(`Congratulations! You guessed the number in ${numGuesses} tries!`);
                endGame();
            } else if (numGuesses === maxGuesses) {
                displayMessage(`Game Over! The number was ${randomNumber}.`);
                endGame();
            } else {
                if (guess < randomNumber) {
                    displayMessage('Too low! Try a higher number.');
                } else {
                    displayMessage('Too high! Try a lower number.');
                }
            }
        }
        
        function displayMessage(message) {
            lowOrHi.textContent = message;
        }
        
        function endGame() {
            userInput.disabled = true;
            submit.disabled = true;
            newGameButton.style.display = 'block';
            playGame = false;
        }
        
        function resetGame() {
            randomNumber = Math.floor(Math.random() * 100) + 1;
            previousGuesses = [];
            numGuesses = 0;
            playGame = true;
            
            guessSlot.textContent = '';
            remaining.textContent = maxGuesses;
            lowOrHi.textContent = '';
            
            userInput.disabled = false;
            submit.disabled = false;
            newGameButton.style.display = 'none';
            
            userInput.value = '';
            userInput.focus();
        }