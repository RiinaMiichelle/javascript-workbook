'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

function movePiece(startStack, endStack) {
  // Your code here
  const startStackBlocks = stacks[startStack];
  const endStackBlocks = stacks[endStack];
  const block = startStackBlocks.pop();
  endStackBlocks.push(block);
}

function isLegal(startStack, endStack) {
  // Your code here
  const startStackBlocks = stacks[startStack];
  const endStackBlocks = stacks[endStack];

  //defining variables that we will define later, so we can know if the stacks are empty 
  let startStackBlock;
  let endStackBlock;

  if (startStackBlocks.length<1) {
    //if the array is empty, no block to be moved, setting start block to null
    startStackBlock = null;
  } else {
    //we know array is not empty, getting the first element of the array
    startStackBlock = startStackBlocks[startStackBlocks.length-1];
  }

  if (endStackBlocks.length<1) {
    //if the array is empty, no block to be moved, setting start block to null
    endStackBlock = null; 
  } else {
    //we know array is not empty, getting the first element of the array
    endStackBlock = endStackBlocks[endStackBlocks.length-1];
  }

  //based off defined variables, will return true or flase
  if (startStackBlock === null) {
    //we know the start array is empty, no block to move
    return false;
  } else if (endStackBlock === null) {
    //we know there is a block to be moved and end stack is empty so valid move
    return true;
  } else {
    //we know neither arrays are empty, we can compare blocks to see if start block is smaller than end block
    return startStackBlock < endStackBlock
  }
}



function checkForWin() {
  // Your code here
  // if (stacks.b.length>3 || stacks.a.length>3) {
  //   return true;
  // }
  //   return false;

  const isStackAEmpty = stacks.a.length === 0;
  const isStackBEmpty = stacks.b.length === 0;
  const isStackCEmpty = stacks.c.length === 0;

  if (isStackAEmpty && isStackCEmpty) {
    return true;
  } else if (isStackBEmpty && isStackCEmpty) {
    return true;
  }

  return false;
}

// Returns true if the user won the game, false otherwise
function towersOfHanoi(startStack, endStack) {
  // Your code here

  // check if move is illegal
   // if it is illegal give error
   const isLegalMove = isLegal(startStack, endStack);
   if (!isLegalMove) {
    console.log('Error, block on startStack is larger than block on endStack')
    return false;
  }
  
  // legal move - move the blocks
  movePiece(startStack, endStack);
  

  // return true if the user has won, false otherwise
  return checkForWin();
}

function getPrompt(moveNumber) {
  printStacks();
  console.log(`Move number ${moveNumber}`);
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      if (!stacks[startStack] || !stacks[endStack]) {
        console.log(`Must input a valid stack name: ${Object.keys(stacks)}`)
        return;
      }

      const hasUserWon = towersOfHanoi(startStack, endStack);

      if (hasUserWon) {
        console.log('You won! :)');
        return;
      }

      getPrompt(moveNumber + 1);
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });

    it('if a is emply and its the start stack, should return false', () => {
      stacks = {
        a: [],
        b: [4,3],
        c: [2,1]
      };
      assert.equal(isLegal('a', 'b'), false);
    })
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });

    it('should not consider all blocks in stack "c" a win', () => {
      stacks = { a: [], b: [], c: [4, 3, 2, 1] };
      assert.equal(checkForWin(), false);
    });

    it('should consider stack a for a win if it has all blocks', () => {
      stacks = { a: [4, 3, 2, 1], b: [], c: [] };
      assert.equal(checkForWin(), true);
    })
  });

  describe('#movePiece()', () => {
    it('should move an item', () => {
      stacks = {a: [2,1], b:[3], c:[4]};
      movePiece('a', 'b')
      assert.deepEqual(stacks, {a: [2], b:[3, 1], c:[4]});
    });
  });

} else {

  getPrompt(1);

}
