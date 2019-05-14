let onSwitch;
let offSwitch;
let controls;
let grid;
let menu;

function preload() {
  onSwitch = loadImage('./src/assets/switch-on.png');
  offSwitch = loadImage('./src/assets/switch-off.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  /**
   * Create game menu
   */
  menu = new Menu();

  /**
   * Create the game grid, with a square size of 90
   */
  grid = new Grid(90);
  grid.layout();

  /**
   * Create a controller that switches
   * between o and x
   */
  controls = new Controller('x');
}

/**
 * Main game loop
 */
function draw() {
  /**
   * Canvas layout and game title
   */
  background(255);  
  textAlign(CENTER);
  fill(0);
  textSize(52);
  text("Tic Tac Toe!", width / 2, 100);

  /**
   * Redraw the grid every frame
   */
  if(!menu.isShown) {
    grid.create();
    controls.update();
    controls.gameOver = false;
  }

  /**
   * Draw menu at start, death and quit
   */
  menu.update();
}

function mousePressed() {
  /**
   * Only let click affect game if game is not over
   */
  if(!controls.gameOver && !menu.isShown) {
    /**
     * Handle the mode of the controller
     */
    if(mouseX > controls.imageX && mouseX < controls.imageX + controls.imageW) {
      if(mouseY > controls.imageY && mouseY < controls.imageH + controls.imageY) {
        if(controls.mode === 'x') {
          controls.mode = 'o';
        } else {
          controls.mode = 'x';
        }
      }
    }

    /**
     * Handle the drawing of the item
     */
    grid.locations.forEach((block, index) => {
      let mark = controls.mode;

      /**
       * Check whether the mouse position
       * is on any of the blocks
       */
      if(mouseX > block.x && mouseX < block.x + grid.h) {
        if(mouseY > block.y && mouseY < block.y + grid.h) {
          /**
           * find the center of the block
           */
          let x = block.x + grid.h / 2;
          let y = block.y + grid.h / 2;
          let exists = false; // Boolean to track if we don't already have a symbol in this block

          /**
           * Test if this block has been marked
           * (sets the exists variable)
           */
          grid.drawX.forEach(obj => {
            if(obj.x == x && obj.y == y && obj.mark) {
              exists = true;
            }
          });

          /**
           * Draw the mark if it is an empty block
           * and set the control to other team
           */
          if(!exists) {
            grid.markX({x, y, mark, index});
            controls.switch();
          }
        }
      }
    });

    /**
     * test if winning state
     */
    let winningIndexes = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];


    winningIndexes.forEach(set => {
      if(
        grid.drawX[set[0]] &&
        grid.drawX[set[1]] &&
        grid.drawX[set[2]] &&
        grid.drawX[set[0]].mark == grid.drawX[set[1]].mark &&
        grid.drawX[set[1]].mark == grid.drawX[set[2]].mark) {
        /**
         * Only if this is three consecutive in
         * any of the above orders, draw the line
         * through the three items
         */
        grid.drawLine(grid.drawX[set[0]], grid.drawX[set[2]]);

        /**
         * Set the game to game over
         */
        controls.gameOver = true;
        controls.end();
        grid.reset();
        controls.mode = 'x';
      }
    });
  }
}