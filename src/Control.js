class Controller {
  constructor(mode) {
    this.mode = mode;
    this.imageX = width / 2 - 50;
    this.imageY = height - 60;
    this.imageW = 100;
    this.imageH = 50;
    this.gameOver = true;
  }

  update() {
    fill(0);
    textAlign(CENTER);
    /**
     * Draww the x and oh next to switch
     */
    text('x', width / 2 - 75, height - 20);
    text('o', width / 2 + 75, height - 20);

    /**
     * render the image according to the mode
     */
    if(this.mode === 'x') {
      image(onSwitch, this.imageX, this.imageY, this.imageW, this.imageH);
    } else {
      image(offSwitch, this.imageX, this.imageY, this.imageW, this.imageH);
    }
  }

  /**
   * Change the switch state between players
   */
  switch() {
    if(this.mode === 'x') {
      this.mode = 'o';
    } else {
      this.mode = 'x';
    }
  }

  start(mode) {
    menu.w = 0;
    menu.h = 0;
    menu.title = '';
    menu.singleButton.hide();
    menu.multiButton.hide();
    menu.isShown = false;
    // Mode logic
  }

  end() {
   menu.x = width / 2;
   menu.y = height / 2;
   menu.h = 250;
   menu.w = 300;
   menu.singleButton.show();
   menu.multiButton.show();
   menu.title = 'MENU';
   menu.isShown = true;
  }
}