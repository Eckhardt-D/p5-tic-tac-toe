class Menu {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.h = 250;
    this.w = 300;
    this.singleButton = createButton('Single Player');
    this.multiButton = createButton('Multiplayer');
    this.title = 'MENU';
    this.isShown = true;
  }

  update() {
    rectMode(CENTER);
    textAlign(CENTER);

    fill(0, 0, 0, 0.5);
    rect(this.x, this.y + (this.h / 2 - 30), this.w, this.h);

    rectMode(CORNER);

    fill(0);
    textSize(20);
    text(this.title, this.x, this.y);

    this.singleButton.position(this.x - this.singleButton.width / 2, this.y + (this.h / 2 - 70));
    this.multiButton.position(this.x - this.multiButton.width / 2, this.y + (this.h / 2 - 30));
    
    this.singleButton.mousePressed(() => this.startGame('single'));
    this.multiButton.mousePressed(() => this.startGame('multi'));
  }

  startGame(mode) {
    controls.start(mode);
  }
}