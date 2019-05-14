let onSwitch;
let offSwitch;

class Grid {
  constructor(squareHeight) {
    this.h = squareHeight;
    this.x = width / 2 - this.h * 1.5;
    this.y = height / 2 - this.h * 1.5;
    this.locations = [];
    this.drawX = [];
    this.line = {};
  }

  create() {
    // Draw play area grid
    this.locations.forEach(location => {
      fill(255);
      stroke(0);
      rect(location.x, location.y, this.h, this.h);
    });

    if(this.drawX.length) {
      this.drawX.forEach(mark => {
        fill(0);
        textAlign(CENTER, CENTER);
        text(mark.mark, mark.x, mark.y);
      });
    }

    if(this.line.x1) {
      line(this.line.x1, this.line.y1, this.line.x2, this.line.y2);
    }
  }

  layout() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.locations.push({
          x: i * this.h + this.x,
          y: j * this.h + this.y
        });
      }      
    }
  }

  markX({x, y, mark, index}) {
    this.drawX[index] = { x, y, mark };
  }

  drawLine(a, b, c) {
    this.line.x1 = a.x;
    this.line.y1 = a.y;
    this.line.x2 = c.x;
    this.line.y2 = c.y;

    controls.gameOver = true;
  }
}

class Controller {
  constructor(mode) {
    this.mode = mode;
    this.imageX = width / 2 - 50;
    this.imageY = height - 60;
    this.imageW = 100;
    this.imageH = 50;
    this.gameOver = false;
  }

  setMode(mode) {
    switch(mode) {
      case 'x':
        this.mode = 'x';
        break;
      case 'o':
        this.mode = 'o';
        break;
      default:
        this.mode = 'x';
        break;
    }
  }

  update() {
    fill(0);
    textAlign(CENTER);
    text('x', width / 2 - 75, height - 20);
    text('o', width / 2 + 75, height - 20);

    if(this.mode === 'x') {
      image(onSwitch, this.imageX, this.imageY, this.imageW, this.imageH);
    } else {
      image(offSwitch, this.imageX, this.imageY, this.imageW, this.imageH);
    }
  }

  switch() {
    if(this.mode === 'x') {
      this.mode = 'o';
    } else {
      this.mode = 'x';
    }
  }
}

let grid;
let controls;

function preload() {
  onSwitch = loadImage('./src/switch-on.png');
  offSwitch = loadImage('./src/switch-off.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = new Grid(90);
  grid.layout();

  controls = new Controller('x');
}

function draw() {
  background(255);  
  textAlign(CENTER);
  fill(0);
  textSize(52);
  text("Tic Tac Toe!", width / 2, 100);

  grid.create();
  controls.update();
}

function mousePressed() {
  if(!controls.gameOver) {
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

      if(mouseX > block.x && mouseX < block.x + grid.h) {
        if(mouseY > block.y && mouseY < block.y + grid.h) {
          let x = block.x + grid.h / 2;
          let y = block.y + grid.h / 2;
          let exists = false;

          grid.drawX.forEach(obj => {
            if(obj.x == x && obj.y == y && obj.mark) {
              exists = true;
            }
          });

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
        grid.drawLine(grid.drawX[set[0]], grid.drawX[set[1]], grid.drawX[set[2]]);
      }
    });
  }
}