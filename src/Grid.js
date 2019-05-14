class Grid {
  constructor(squareHeight) {
    this.h = squareHeight;
    this.x = width / 2 - this.h * 1.5;
    this.y = height / 2 - this.h * 1.5;
    this.locations = [];
    this.drawX = [];
    this.line = {};
  }

  // Runs every frame
  create() {
    // Draw play area grid
    this.locations.forEach(location => {
      fill(255);
      stroke(0);
      rect(location.x, location.y, this.h, this.h);
    });

    /**
     * Check if any marks exist
     * in the array of marks
     * and make sure to draw them
     */
    if(this.drawX.length) {
      this.drawX.forEach(mark => {
        fill(0);
        textAlign(CENTER, CENTER);
        text(mark.mark, mark.x, mark.y);
      });
    }

    /**
     * Check if a request to draw
     * a line has been made
     */
    if(this.line.x1) {
      line(this.line.x1, this.line.y1, this.line.x2, this.line.y2);
    }
  }

  // Only runs on setup
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

  /**
   * Set the mark in the mark state array
   * to prompt the loop to draw it.
   */
  markX({x, y, mark, index}) {
    this.drawX[index] = { x, y, mark };
  }

  /**
   * Set line coordinates
   * to draw in loop
   */
  drawLine(a, c) {
    this.line.x1 = a.x;
    this.line.y1 = a.y;
    this.line.x2 = c.x;
    this.line.y2 = c.y;
  }

  reset() {
    this.drawX = [];
    this.line = {};
  }
}