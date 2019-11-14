'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function printBoard() {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

function generateSolution() {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateHint(guess) {
  const solutionArray = solution.split('');
  // should be [ 'null', 'null', 'null', 'd' ]
  
  const guessArray = guess.split('');
  // if guess was 'abdc'
  // should be [ 'a', 'b', 'd', 'c' ]

  let redPegs = 0;
  let whitePegs = 0;

  // checking for redPegs
  for (let i = 0; i < solutionArray.length; i++) {
    if (solutionArray[i] === guessArray[i]) {
      redPegs++;
      solutionArray[i] = null;
    }
  }

  let targetIndex = null;
  // checking for whitePegs
  for (let i = 0; i < guessArray.length; i++) {
    targetIndex = solutionArray.indexOf(guessArray[i]);

    if (targetIndex > -1) {
      whitePegs++;
      solutionArray[targetIndex] = null;
    }
  }

  // return a string representation of redPegs and whitePegs variables
  return `${redPegs}-${whitePegs}`;
  // return redPegs + '-' + whitePegs;
}


function mastermind(guess) {
  solution = 'abcd'; // Comment this out to generate a random solution

  if (guess === solution) {
    return 'You guessed it!';
  }

  // User guessed wrong, register their guess and give a hint
  // your code here
  const hint = generateHint(guess);
  board.push(`${guess} ${hint}`);
  return null;

}

// guessNumber is the current guess number the user is on. Only 10 guesses are supported
function getPrompt(guessNumber) {
  if (guessNumber > 10) {
    console.log(`You ran out of turns! The solution was ${solution}`);
    return;
  }

  rl.question('guess: ', (guess) => {
    const mastermindVerdict = mastermind(guess); // either 'You guessed it!' or null
    if (mastermindVal) {
      console.log(mastermindVal);
      return;
    } else {
      console.log('Guess again.')
      printBoard();
      getPrompt(guessNumber + 1); // call the same function recursively but incremenet the guess
    }
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {
  generateSolution();
  getPrompt(1); // kick off the game on guess 1 (the parameter being passed in)
}
