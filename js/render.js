function createSquare() {
  const square = document.createElement("div");
  square.classList.add("square");
  const icon = createIcon();
  square.append(icon);
  return square;
}

function createIcon(value = "circle") {
  const icon = document.createElement("img");
  icon.classList.add("icon");
  icon.setAttribute("alt", "Game icon");
  setIconSrc(icon, value);
  return icon;
}

function setIconSrc(icon, value) {
  icon.setAttribute("src", `assets/${value}.svg`);
}

function setupSquareEvents(square, dataSquare, onSquareChosen) {
  square.addEventListener("click", () => {
    square.classList.add("chosen");
    onSquareChosen(dataSquare);
  });
}

function renderGameArea(dataSquares, onSquareChosen) {
  const gameArea = document.querySelector(".game-area");
  dataSquares.forEach((dataSquare) => {
    const square = createSquare();
    setupSquareEvents(square, dataSquare, onSquareChosen);
    gameArea.append(square);
  });
}

function renderPlayers(dataPlayers) {
  const playersContainer = document.querySelector(".players");
  Object.values(dataPlayers).forEach((dataPlayer) => {
    const playerContainer = document.createElement("div");

    const playerName = document.createElement("div");
    playerName.textContent = `Player ${dataPlayer.name}`;

    const icon = createIcon(dataPlayer.side.toLowerCase());

    playerContainer.append(playerName, icon);
    playerContainer.classList.add(
      "player",
      `player-${dataPlayer.name.toLowerCase()}`
    );
    playersContainer.append(playerContainer);
  });
}

function alignSquaresWithCurrentPlayer(playerSide) {
  const icons = document.querySelectorAll(".square:not(.chosen) .icon");
  icons.forEach((icon) => {
    setIconSrc(icon, playerSide.toLowerCase());
  });
}

function renderPlayerTurn({ name, side }) {
  const players = document.querySelectorAll(".player");
  players.forEach((player) => player.classList.remove("has-turn"));

  const player = document.querySelector(`.player-${name.toLowerCase()}`);
  player.classList.add("has-turn");

  alignSquaresWithCurrentPlayer(side);
}

function inactivateGameArea() {
  const gameArea = document.querySelector(".game-area");
  gameArea.classList.add("inactive");
}

function showToast(message) {
  const toast = document.querySelector(".toast");
  toast.textContent = message;
  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 5000);
}

export {
  renderGameArea,
  renderPlayers,
  renderPlayerTurn,
  inactivateGameArea,
  showToast,
};
