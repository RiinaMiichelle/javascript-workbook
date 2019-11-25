'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


class Checker {
  // Your code here
  constructor(color, id) {
    this.id = id;
    if (color === 'white') {
      this.symbol = String.fromCharCode(0x125CB);
    } else if (color === 'black') {
        this.symbol = String.fromCharCode(0x125CF);
      }
    }
  }


class Board {
  constructor() {
    this.grid = [];
    this.checkers = [];
  }
  // method that creates an 8x8 array, filled with null values
  createCheckers() {
    let whitePositions = 
    [[0, 1], [0, 3], [0, 5], [0, 7],
    [1, 0], [1, 2], [1, 4], [1, 6],
    [2, 1], [2, 3], [2, 5], [2, 7]];

    let blackPositions = 
    [[5, 0], [5, 2], [5, 4], [5, 6],
    [6, 1], [6, 3], [6, 5], [6, 7],
    [7, 0], [7, 2], [7, 4], [7, 6]];

    // We made the initializeCheckers function to eliminate code duplication of placing checkers when the game starts
    this.initializeCheckers(whitePositions, 'white');
    this.initializeCheckers(blackPositions, 'black');
  }

  initializeCheckers(checkersArray, color) {
    for (let i=0; i<checkersArray.length; i++) {
      let checker = new Checker(color, `${color}-${i}`);
      this.checkers.push(checker);
      const checkerCoordinates = checkersArray[i];
      this.grid[checkerCoordinates[0]][checkerCoordinates[1]] = checker;
    }
  }

  createGrid() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(null);
      }
    }
  }

  viewGrid() {
    // add our column numbers
    let string = "  0 1 2 3 4 5 6 7\n";
    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row];
      // a loop within a loop
      for (let column = 0; column < 8; column++) {
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the check in that location into the array
          rowOfCheckers.push(this.grid[row][column].symbol);
        } else {
          // just push in a blank space
          rowOfCheckers.push(' ');
        }
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      // add a 'new line'
      string += "\n";
    }
    console.log(string);
  }

  selectChecker(row, column) {
    return this.grid[row][column];
  }

  // coordinatePair - the coordinate in the grid to kill the check ex) [0, 1]
  killChecker(coordinatePair) {
    const row = coordinatePair[0];
    const column = coordinatePair[1];
    // Go get the checker in the grid at the coordinates
    const checker = this.selectChecker(row, column);

    // Remove the checker from the checkers array (using splice)
    //     const indexOfCheckerInArray = this.checkers.indexOf((checkerInArray) => checkerInArray.id === checker.id);
    //     const indexOfCheckerInArray = this.checkers.indexOf((checkerInArray) => { return checkerInArray.id === checker.id });
    const indexOfCheckerInArray = this.checkers.indexOf(function (checkerInArray) { return checkerInArray.id === checker.id });
    // Checker is dead. Remove from the board (set to null)
    this.checkers.splice(indexOfCheckerInArray, 1) 
    this.grid[row][column] = null;
  }
}

class Game {
  constructor() {
    this.board = new Board();
  }
  start() {
    this.board.createGrid();
    this.board.createCheckers();
  }

  // start is the coordinates for the start in the grid ex) '50'
  // end is the coordinates for where we're moving the checker in the grid ex) '20'
  moveChecker(startCoordinateString, endCoordinateString) {
    const start = stringCoordinateToArrayCoordinate(startCoordinateString);
    const end = stringCoordinateToArrayCoordinate(endCoordinateString);

    const startRow = start[0];
    const startColumn = start[1];

    const endRow = end[0];
    const endColumn = end[1];

    const checker = this.board.selectChecker(startRow, startColumn);

    // if the checker killed another checker (moved more than one row) then call this.board.killChecker for the killed checker
    const didCheckGetKilled = Math.abs(endRow - startRow) > 1;

    if (didCheckGetKilled) {
      // determine the row of the killed checker
      let killedCheckerRow;
      if (startRow > endRow) {
        // if start row is greater than end row then we know the checker moved up in the board (towards the top of the board)
        killedCheckerRow = startRow - 1;
      } else {
        // checker was moved down towards the end of the board
        killedCheckerRow = startRow + 1;
      }
  
      // determine the column of the killed checker
      let killedCheckerColumn = startColumn; // the column might now have changed
      if (startColumn != endColumn) {
        // the column changed ... see if the checker moved left or right on the board
        if (startColumn > endColumn) {
          // the checker moved left diagonaly
          killedCheckerColumn = startColumn - 1;
        } else {
          // the checker moved right diagonaly
          killedCheckerColumn = startColumn + 1;
        }
      }

      const killedCheckerLocation = [killedCheckerRow, killedCheckerColumn];
      this.board.killChecker(killedCheckerLocation);
    }

    this.board.grid[endRow][endColumn] = checker;
  }
}

function stringCoordinateToArrayCoordinate(stringCoordinate) {
  const strSplitByCharacter = stringCoordinate.split('');
  return strSplitByCharacter.map(function (intString) { return parseInt(intString); });
}

function getPrompt() {
  game.board.viewGrid();
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}

const game = new Game();
game.start();


// Tests
if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe('Game.moveChecker()', () => {
    it('should move a checker', () => {
      assert(!game.board.grid[4][1]);
      game.moveChecker('50', '41');
      assert(game.board.grid[4][1]);
      game.moveChecker('21', '30');
      assert(game.board.grid[3][0]);
      game.moveChecker('52', '43');
      assert(game.board.grid[4][3]);
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('30', '52');
      assert(game.board.grid[5][2]);
      assert(!game.board.grid[4][1]);
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}
