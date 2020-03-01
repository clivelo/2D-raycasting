class Wall {
  constructor(randomized, ax, ay, bx, by) {
    if (randomized) {
      this.randomizeWalls();
    } else {
      this.ax = ax;
      this.ay = ay;
      this.bx = bx;
      this.by = by;
    }
  }

  show() {
    line(this.ax, this.ay, this.bx, this.by);
  }

  randomizeWalls() {
    this.ax = random(0, width);
    this.ay = random(0, height);
    this.bx = random(0, width);
    this.by = random(0, height);
  }
}