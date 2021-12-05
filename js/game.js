import {
  renderGameArea,
  renderPlayers,
  renderPlayerTurn,
  inactivateGameArea,
  showToast,
} from "./render.js";

const sides = ["CIRCLE", "CROSS"];

let players = {};
let currentPlayer = null;
let squares = [];
let playerTurn = null;

function createPlayer(name) {
  const obj = {
    name,
    side: null,
  };

  return {
    get name() {
      return name;
    },
    get side() {
      return obj.side;
    },
    set side(value) {
      obj.side = value;
    },
  };
}

function createSquare() {
  const obj = {
    value: null,
  };

  return {
    get value() {
      return obj.value;
    },
    set value(value) {
      obj.value = value;
    },
  };
}

function createSquares() {
  const squares = [];
  for (let i = 0; i < 9; i++) {
    const square = createSquare();
    squares.push(square);
  }
  return squares;
}

function allSquaresAreChosen() {
  return squares.filter((square) => square.value === null).length === 0;
}

function isThreeInSequence(first, second, third) {
  return (
    first === second &&
    second === third &&
    // Exclude null, since all square values are 'null' by default
    ![first, second, third].includes(null)
  );
}

/* Probably a pretty shitty solution but I can't be bothered to figure out
anything else. It's late and I'm tired ;) */
function playerHasWon() {
  let hasWon = false;

  squares.forEach((square, i) => console.log(square.value, i));

  // Iterate rows
  for (let firstOfRow = 0; firstOfRow <= 6; firstOfRow += 3) {
    if (
      isThreeInSequence(
        squares[firstOfRow].value,
        squares[firstOfRow + 1].value,
        squares[firstOfRow + 1 * 2].value
      )
    ) {
      hasWon = true;
    }
  }

  // Iterate columns
  for (let col = 0; col < 3; col++) {
    if (
      isThreeInSequence(
        squares[col].value,
        squares[col + 3].value,
        squares[col + 3 * 2].value
      )
    ) {
      hasWon = true;
    }
  }

  // Check the two diagonals

  // Top left to bottom right
  if (isThreeInSequence(squares[0].value, squares[4].value, squares[8].value)) {
    hasWon = true;
  }

  // // Top right to bottom left
  if (isThreeInSequence(squares[2].value, squares[4].value, squares[6].value)) {
    hasWon = true;
  }

  return hasWon;
}

function gameIsOver() {
  return allSquaresAreChosen() || playerHasWon();
}

function assignSidesToPlayers() {
  const randomValue = Math.floor(Math.random() * sides.length);
  players.one.side = sides.splice(randomValue, 1)[0];
  players.two.side = sides.pop();
}

function moveTurn() {
  if (playerTurn === Object.values(players).length - 1) {
    playerTurn = 0;
  } else {
    playerTurn++;
  }
  setCurrentPlayer();
}

function setCurrentPlayer() {
  currentPlayer = Object.values(players)[playerTurn];
  renderPlayerTurn(currentPlayer);
}

function onSquareChosen(square) {
  square.value = currentPlayer.side;
  if (gameIsOver()) {
    if (allSquaresAreChosen()) {
      showToast("All squares have been chosen, refresh to restart");
    } else {
      showToast(`Player ${currentPlayer.name} has won, refresh to restart`);
      console.log(currentPlayer.name);
    }
    inactivateGameArea();
    return;
  }
  moveTurn();
}

function initGame() {
  players = {
    one: createPlayer("One"),
    two: createPlayer("Two"),
  };
  squares = createSquares();
  assignSidesToPlayers();
  playerTurn = 0;
}

function playGame() {
  initGame();

  renderGameArea(squares, onSquareChosen);
  renderPlayers(players);
  setCurrentPlayer();
}

export { playGame };
