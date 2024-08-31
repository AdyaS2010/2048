/*
@title: 2048
@author: Adya
@tags: []
@addedOn: 2024-08-17
*/

const EMPTY = "-";
const TILE_VALUES = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"];
const TILE_MAP = {
  "-": EMPTY,
  "a": "2",
  "b": "4",
  "c": "8",
  "d": "16",
  "e": "32",
  "f": "64",
  "g": "128",
  "h": "256",
  "i": "512",
  "j": "1024",
  "k": "2048"
};

setLegend(
  [EMPTY, bitmap],
  ...TILE_VALUES.map((value, index) => [value, bitmap])
);

let level = 0;
const levels = [
  map`
----
----
----
----`,
];

let boardChanged = false;
let isGameOver = false;

function moveTiles(direction) {
  if (isGameOver) return;

  const moveFunctions = {
    "w": moveUp,
    "s": moveDown,
    "a": moveLeft,
    "d": moveRight
  };

  moveFunctionsdirection;
  if (boardChanged) {
    generateTile();
    boardChanged = false;
  }

  if (checkLoss()) {
    isGameOver = true;
    displayMessage("You lost :(", "Press j to restart");
  } else if (getAll("k").length >= 1) {
    isGameOver = true;
    displayMessage("You win!", "Press j to restart");
  }
}

function moveUp() {
  for (let x = 0; x <= 3; x++) {
    let nextYToFill = 0;
    for (let y = 1; y <= 3; y++) {
      handleTileMove(x, y, x, nextYToFill, "y", 1);
    }
  }
}

function moveDown() {
  for (let x = 0; x <= 3; x++) {
    let nextYToFill = 3;
    for (let y = 2; y >= 0; y--) {
      handleTileMove(x, y, x, nextYToFill, "y", -1);
    }
  }
}

function moveLeft() {
  for (let y = 0; y <= 3; y++) {
    let nextXToFill = 0;
    for (let x = 1; x <= 3; x++) {
      handleTileMove(x, y, nextXToFill, y, "x", 1);
    }
  }
}

function moveRight() {
  for (let y = 0; y <= 3; y++) {
    let nextXToFill = 3;
    for (let x = 2; x >= 0; x--) {
      handleTileMove(x, y, nextXToFill, y, "x", -1);
    }
  }
}

function handleTileMove(x, y, nextX, nextY, axis, step) {
  const currentTile = getTile(x, y)[0].type;
  const nextTile = getTile(nextX, nextY)[0].type;

  if (currentTile === EMPTY) return;

  if (currentTile === nextTile) {
    clearTile(nextX, nextY);
    addSprite(nextX, nextY, TILE_VALUES[TILE_VALUES.indexOf(currentTile) + 1]);
    clearTile(x, y);
    addSprite(x, y, EMPTY);
    boardChanged = true;
  } else if (nextTile === EMPTY) {
    clearTile(nextX, nextY);
    addSprite(nextX, nextY, currentTile);
    clearTile(x, y);
    addSprite(x, y, EMPTY);
    boardChanged = true;
  } else {
    if (axis === "x") {
      nextX += step;
    } else {
      nextY += step;
    }
    handleTileMove(x, y, nextX, nextY, axis, step);
  }
}

function generateTile() {
  const emptyTiles = getAll(EMPTY);
  if (emptyTiles.length === 0) return;

  const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
  clearTile(randomTile.x, randomTile.y);
  addSprite(randomTile.x, randomTile.y, "a");
}

function checkLoss() {
  if (getAll(EMPTY).length > 0) return false;

  for (let x = 0; x <= 3; x++) {
    for (let y = 1; y <= 3; y++) {
      if (getTile(x, y)[0].type === getTile(x, y - 1)[0].type) return false;
    }
  }

  for (let y = 0; y <= 3; y++) {
    for (let x = 1; x <= 3; x++) {
      if (getTile(x, y)[0].type === getTile(x - 1, y)[0].type) return false;
    }
  }

  return true;
}

function displayMessage(message, subMessage) {
  addText(message, { y: 4, color: color`0` });
  addText(subMessage, { y: 8, color: color`0` });
}

onInput("w", () => moveTiles("w"));
onInput("s", () => moveTiles("s"));
onInput("a", () => moveTiles("a"));
onInput("d", () => moveTiles("d"));
onInput("j", () => {
  isGameOver = false;
  clearText("");
  setMap(levels[level]);
  generateTile();
  generateTile();
});
