import { renderGameArea, renderPlayers, renderPlayerTurn } from "./render.js";

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

function gameIsOver() {
  // To do expand to figure out adjacent 3
  return document.querySelectorAll(".square:not(.chosen)").length === 0;
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
  // TODO figure out if a player has won or not, or if all tiles are taken, if so show modal
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
