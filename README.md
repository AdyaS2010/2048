# 2048

## Description
This is a JavaScript implementation of the classic 2048 game for Sprig! The objective is to combine tiles with the same value to reach the 2048 tile (same rules as 2048 - follows convention)! 

### Link to Game
https://sprig.hackclub.com/share/n2dVKeFOjQs1hRdNdfMz 

## How to Play
- Use the **W**, **A**, **S**, and **D** keys to move the tiles up, left, down, and right, respectively.
- When two tiles with the same value collide, they merge into one tile with the sum of their values.
- The game is won when a tile with the value 2048 is created.
- The game is lost when there are no empty spaces and no possible merges left.

## Features
- Simple and intuitive controls.
- Automatic tile generation after each move.
- Win and loss detection with corresponding messages.
- Restart the game by pressing the **J** key.

## Code Overview
- **Constants**: Defines the empty tile and the values for each tile.
- **Tile Map**: Maps the tile characters to their corresponding values.
- **Legend**: Sets the legend for the tiles.
- **Levels**: Defines the initial game board.
- **Movement Functions**: Handles the movement of tiles in all four directions.
- **Tile Handling**: Manages the merging and moving of tiles.
- **Tile Generation**: Generates new tiles in empty spaces.
- **Loss Check**: Checks if there are no possible moves left.
- **Display Message**: Displays win or loss messages.
- **Input Handling**: Handles user input for moving tiles and restarting the game.

## Author
- **Adya**

## Tags
- JavaScript, Game, 2048

## Added On
- 2024-08-17
