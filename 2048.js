/*
@title: 2048
@author: Adya
@tags: []
@addedOn: 2024-08-17
*/

const gridSize = 4;
let grid = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
let previousGrid = [];
let score = 0;
let highScore = 0;
let undoCount = 3; // Limits number moves one can undo ... 

setLegend(
   [ 'border', bitmap`
1111111111111111
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1111111111111111`],
  [ 'tile2', bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222221111222222
2222221221222222
2222222221222222
2222221111222222
2222221222222222
2222221111222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [ 'tile4', bitmap`
2222222222222222
2222222222222222
2222222222222222
2222212222212222
2222212222212222
2222212222212222
2222212222212222
2222212222212222
2222211111112222
2222222222212222
2222222222212222
2222222222212222
2222222222212222
2222222222222222
2222222222222222
2222222222222222`],
  [ 'tile8', bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFF222222FFFFF
FFFFF2FFFF2FFFFF
FFFFF2FFFF2FFFFF
FFFFF2FFFF2FFFFF
FFFFF222222FFFFF
FFFFF2FFFF2FFFFF
FFFFF2FFFF2FFFFF
FFFFF2FFFF2FFFFF
FFFFF222222FFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF`],
  [ 'tile16', bitmap`
9999999999999999
9999999999999999
9999999999999999
9999229929999999
9992929929999999
9999929929999999
9999929929999999
9999929929999999
9999929922229999
9999929929929999
9999929929929999
9999929929929999
9999222922229999
9999999999999999
9999999999999999
9999999999999999`],
   [ 'tile64', bitmap`
4444444444444444
4444444444444444
4444444444444444
4442222422224444
4444442444424444
4444442444424444
4444442444424444
4442222422224444
4444442424444444
4444442424444444
4444442424444444
4442222422224444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [ 'tile64', bitmap`
3333333333333333
3333333333333333
3333333333333333
3332333323333333
3332333323332333
3332333323332333
3332333323332333
3332333323332333
3332222322222333
3332332333332333
3332332333332333
3332332333332333
3332222333332333
3333333333333333
3333333333333333
3333333333333333`],
  [ 'tile128', bitmap`
6666666666666666
6666666666666666
6662266222622226
6666266662626626
6666266662626626
6666266662626626
6666266662626626
6666266222622226
6666266266626626
6666266266626626
6666266266626626
6666266266626626
6666266266626626
6662226222622226
6666666666666666
6666666666666666`],
  [ 'tile256', bitmap`
8888888888888888
8888888888888888
8822282222828888
8888282888828888
8888282888828888
8888282888828888
8888282888828888
8822282222822228
8828888882828828
8828888882828828
8828888882828828
8828888882828828
8822282222822228
8888888888888888
8888888888888888
8888888888888888`],
  [ 'tile512', bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HH222HH22HH222HH
HH2HHHHH2HHHH2HH
HH2HHHHH2HHHH2HH
HH2HHHHH2HHHH2HH
HH2HHHHH2HHHH2HH
HH2HHHHH2HHHH2HH
HH222HHH2HH222HH
HHHH2HHH2HH2HHHH
HHHH2HHH2HH2HHHH
HHHH2HHH2HH2HHHH
HHHH2HHH2HH2HHHH
HH222HH222H222HH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],
  [ 'tile1024', bitmap`
7777777777777777
7777777777777777
7227222272227277
7727277277727272
7727277277727272
7727277277727272
7727277277727272
7727277277727272
7727277272227222
7727277272777772
7727277272777772
7727277272777772
7727277272777772
7727222272222772
7777777777777777
7777777777777777`],
  [ 'tile2048', bitmap`
5555555555555555
5555555555555555
5222522252555222
5552525252525252
5552525252525252
5552525252525252
5552525252525252
5552525252225252
5222525255525222
5255525255525252
5255525255525252
5255525255525252
5255525255525252
5222522255525222
5555555555555555
5555555555555555`]
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
  addText(`Score: ${score}`, { x: 1, y: 8, color: color`3` });
  addText(`High Score: ${highScore}`, { x: 1, y: 9, color: color`3` });
  addText(`Undo: ${undoCount}`, { x: 1, y: 10, color: color`3` });
}

function savePreviousGrid() {
  previousGrid = grid.map(row => row.slice());
}

function undoMove() {
  if (previousGrid.length > 0 && undoCount > 0) {
    grid = previousGrid.map(row => row.slice());
    drawGrid();
    undoCount--;
  }
}

function animateTileMove(fromX, fromY, toX, toY) {
  let tile = getTile(fromX, fromY);
  if (tile) {
    tile.animate({ x: toX, y: toY }, 200); // 200ms animation duration
  }
}

function playSound(sound) {
  // Add your sound playing logic here
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
        score += grid[i][j];
        if (score > highScore) {
          highScore = score;
        }
        playSound('merge'); // Play merge sound
      }
    }
  }
}

function moveLeft() {
  savePreviousGrid();
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
        score += grid[i][j];
        if (score > highScore) {
          highScore = score;
        }
        playSound('merge'); // Play merge sound
      }
    }
  }
}

function moveRight() {
  savePreviousGrid();
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
        score += grid[i][j];
        if (score > highScore) {
          highScore = score;
        }
        playSound('merge'); // Play merge sound
      }
    }
  }
}

function moveUp() {
  savePreviousGrid();
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
        score += grid[i][j];
        if (score > highScore) {
          highScore = score;
        }
        playSound('merge'); // Play merge sound
      }
    }
  }
}

function moveDown() {
  savePreviousGrid();
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

onInput("w", () => {
  moveUp();
  if (checkWin() || checkLoss()) return;
});

onInput("a", () => {
  moveLeft();
  if (checkWin() || checkLoss()) return;
});

onInput("s", () => {
  moveDown();
  if (checkWin() || checkLoss()) return;
});

onInput("d", () => {
  moveRight();
  if (checkWin() || checkLoss()) return;
});

onInput("j", () => undoMove());

addRandomTile();
addRandomTile();
drawGrid();
