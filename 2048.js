/*
@title: 2048
@author: Adya
@tags: []
@addedOn: 2024-08-17
*/

const gridSize = 4;
let grid = Array(gridSize).fill().map(() => Array(gridSize).fill(0));

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

function slideRight() {
  for (let i = 0; i < gridSize; i++) {
    let row = grid[i].filter(val => val);
    let missing = gridSize - row.length;
    let zeros = Array(missing).fill(0);
    grid[i] = zeros.concat(row);
  }
}

function combineRight() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = gridSize - 1; j > 0; j--) {
      if (grid[i][j] === grid[i][j - 1] && grid[i][j] !== 0) {
        grid[i][j] *= 2;
        grid[i][j - 1] = 0;
      }
    }
  }
}

function moveRight() {
  slideRight();
  combineRight();
  slideRight();
  addRandomTile();
  drawGrid();
}

function slideUp() {
  for (let j = 0; j < gridSize; j++) {
    let column = [];
    for (let i = 0; i < gridSize; i++) {
      if (grid[i][j] !== 0) {
        column.push(grid[i][j]);
      }
    }
    let missing = gridSize - column.length;
    let zeros = Array(missing).fill(0);
    for (let i = 0; i < gridSize; i++) {
      grid[i][j] = i < column.length ? column[i] : 0;
    }
  }
}

function combineUp() {
  for (let j = 0; j < gridSize; j++) {
    for (let i = 0; i < gridSize - 1; i++) {
      if (grid[i][j] === grid[i + 1][j] && grid[i][j] !== 0) {
        grid[i][j] *= 2;
        grid[i + 1][j] = 0;
      }
    }
  }
}

function moveUp() {
  slideUp();
  combineUp();
  slideUp();
  addRandomTile();
  drawGrid();
}

function slideDown() {
  for (let j = 0; j < gridSize; j++) {
    let column = [];
    for (let i = 0; i < gridSize; i++) {
      if (grid[i][j] !== 0) {
        column.push(grid[i][j]);
      }
    }
    let missing = gridSize - column.length;
    let zeros = Array(missing).fill(0);
    for (let i = 0; i < gridSize; i++) {
      grid[i][j] = i < missing ? 0 : column[i - missing];
    }
  }
}

function combineDown() {
  for (let j = 0; j < gridSize; j++) {
    for (let i = gridSize - 1; i > 0; i--) {
      if (grid[i][j] === grid[i - 1][j] && grid[i][j] !== 0) {
        grid[i][j] *= 2;
        grid[i - 1][j] = 0;
      }
    }
  }
}

function moveDown() {
  slideDown();
  combineDown();
  slideDown();
  addRandomTile();
  drawGrid();
}

function checkWin() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j] === 2048) {
        addText('You Win!', { x: 5, y: 7, color: color`2` });
        return true;
      }
    }
  }
  return false;
}

function checkLoss() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j] === 0) {
        return false;
      }
      if (i < gridSize - 1 && grid[i][j] === grid[i + 1][j]) {
        return false;
      }
      if (j < gridSize - 1 && grid[i][j] === grid[i][j + 1]) {
        return false;
      }
    }
  }
  addText('Game Over', { x: 5, y: 7, color: color`2` });
  return true;
}

onInput("a", () => {
  moveLeft();
  if (checkWin() || checkLoss()) return;
});

onInput("d", () => {
  moveRight();
  if (checkWin() || checkLoss()) return;
});

onInput("w", () => {
  moveUp();
  if (checkWin() || checkLoss()) return;
});

onInput("s", () => {
  moveDown();
  if (checkWin() || checkLoss()) return;
});

addRandomTile();
addRandomTile();
drawGrid();
