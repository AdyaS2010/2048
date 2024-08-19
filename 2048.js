/*
@title: 2048
@author: Adya
@tags: []
@addedOn: 2024-08-17
*/

const gridSize = 4;
let grid = Array(gridSize).fill().map(() => Array(gridSize).fill(0));

setLegend(
  [ 'tile2', bitmap`
................
................
................
................
...222222222....
...222CCC222....
...22222C222....
...22222C222....
...222CCC222....
...222C22222....
...222C22222....
...222CCC222....
...222222222....
................
................
................`],
  [ 'tile4', bitmap`
................
................
................
....222222222...
....222211222...
....222121222...
....221221222...
....221221222...
....221111122...
....222221222...
....222221222...
....222222222...
................
................
................
................`],
);


function addRandomTile() {
  let emptyTiles = [];
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j] === 0) {
        emptyTiles.push({ x: i, y: j });
      }
    }
  }
  if (emptyTiles.length > 0) {
    let { x, y } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    grid[x][y] = Math.random() < 0.9 ? 2 : 4;
  }
}

function drawGrid() {
  clearText();
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      clearTile(j, i);
      if (grid[i][j] !== 0) {
        addSprite(j, i, `tile${grid[i][j]}`);
      }
    }
  }
}

function slideLeft() {
  for (let i = 0; i < gridSize; i++) {
    let row = grid[i].filter(val => val);
    let missing = gridSize - row.length;
    let zeros = Array(missing).fill(0);
    grid[i] = row.concat(zeros);
  }
}

function combineLeft() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize - 1; j++) {
      if (grid[i][j] === grid[i][j + 1] && grid[i][j] !== 0) {
        grid[i][j] *= 2;
        grid[i][j + 1] = 0;
      }
    }
  }
}

function moveLeft() {
  slideLeft();
  combineLeft();
  slideLeft();
  addRandomTile();
  drawGrid();
}

onInput("a", () => moveLeft());

addRandomTile();
addRandomTile();
drawGrid();
