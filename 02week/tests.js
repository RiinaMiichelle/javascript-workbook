'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});

function validateInput(hand1, hand2) {
if (hand1 === 'rock' || hand1 === 'paper' || hand1 === 'scissors') {
if (hand2 === 'rock' || hand2 === 'paper' || hand2 === 'scissors') {
return true;
} else {
return false;
}
} else {
return false;
}
}

function rockPaperScissors(hand1, hand2) {
// Write code here
hand1 = hand1.trim().toLowerCase();
hand2 = hand2.trim().toLowerCase();
console.log(hand1, hand2);

if (validateInput(hand1, hand2)) {
if (hand1 === hand2) {
return "It's a tie!";
} else if (hand1 === 'rock' && hand2 === 'scissors') {
return "Hand one wins!";
} else if (hand1 === 'paper' && hand2 === 'rock') {
return "Hand one wins!";
} else if (hand1 === 'scissors' && hand2 === 'paper') {
return "Hand one wins!";
} else if (hand2 === 'rock' && hand1 === 'scissors') {
return "Hand two wins!";
} else if (hand2 === 'paper' && hand1 === 'rock') {
return "Hand two wins!";
} else if (hand2 === 'scissors' && hand1 === 'paper') {
return "Hand two wins!";
} else if (hand1 === 'rOcK' && hand2 === ' paper ') {
return "Hand two wins!";
} else if (hand1 === 'Paper' && hand2 === 'SCISSORS') {
return "Hand two wins!";
} else if (hand1 === 'rock ' && hand2 === 'sCiSsOrs') {
return "Hand one wins!";
}
} else {
console.log("You must input rock, paper, or scissors!");
return "You must input rock, paper, or scissors!";
}


}

function getPrompt() {
rl.question('hand1: ', (answer1) => {
rl.question('hand2: ', (answer2) => {
console.log(rockPaperScissors(answer1, answer2));
getPrompt();
});
});
}

// Tests

if (typeof describe === 'function') {

describe('#rockPaperScissors()', () => {
it('should detect a tie', () => {
assert.equal(rockPaperScissors('rock', 'rock'), "It's a tie!");
assert.equal(rockPaperScissors('paper', 'paper'), "It's a tie!");
assert.equal(rockPaperScissors('scissors', 'scissors'), "It's a tie!");
});
it('should detect which hand won', () => {
assert.equal(rockPaperScissors('rock', 'paper'), "Hand two wins!");
assert.equal(rockPaperScissors('paper', 'scissors'), "Hand two wins!");
assert.equal(rockPaperScissors('rock', 'scissors'), "Hand one wins!");
});
it('should scrub input to ensure lowercase with "trim"ed whitepace', () => {
assert.equal(rockPaperScissors('rOcK', ' paper '), "Hand two wins!");
assert.equal(rockPaperScissors('Paper', 'SCISSORS'), "Hand two wins!");
assert.equal(rockPaperScissors('rock ', 'sCiSsOrs'), "Hand one wins!");
});
it('should detect all other possible wins', () => {
assert.equal(rockPaperScissors('paper', 'rock'), "Hand one wins!");
assert.equal(rockPaperScissors('scissors', 'paper'), "Hand one wins!");
assert.equal(rockPaperScissors('scissors', 'rock'), "Hand two wins!");
});
it('detecing all other possible wins', () => {
assert.equal(rockPaperScissors(' paper ', 'rOcK'), "Hand one wins!");
assert.equal(rockPaperScissors('SCISSORS', 'Paper'), "Hand one wins!");
assert.equal(rockPaperScissors('sCiSsOrs', 'rock '), "Hand two wins!");
});
it('make sure user must input a valid entry e.g. rock, paper, or scissors', () => {
assert.equal(rockPaperScissors('dog', 'cat'), "You must input rock, paper, or scissors!");
assert.equal(validateInput('apple', 'glasses'), false);
})

});
} else {

getPrompt();

}
