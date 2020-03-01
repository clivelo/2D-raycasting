class Ray {

  constructor(angle) {
    this.x = constrain(mouseX, 0, width);
    this.y = constrain(mouseY, 0, height);
    this.angle = angle
    this.v = p5.Vector.fromAngle(this.angle, 1000);
    this.poi = null;
  }

  show() {
    push();
    translate(mouseX, mouseY);
    line(0, 0, this.v.x, this.v.y);
    pop();
  }

  move() {
    this.x = constrain(mouseX, 0, width);
    this.y = constrain(mouseY, 0, height);
  }

  intersect() {
    let pois = new Array(walls.length);
    for (var i = 0; i < walls.length; i++) {
      let w = walls[i];
      let x1 = w.ax;
      let y1 = w.ay;
      let x2 = w.bx;
      let y2 = w.by;

      let x3 = this.x;
      let y3 = this.y;
      let x4 = this.x + this.v.x;
      let y4 = this.y + this.v.y;

      let den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
      if (den == 0) {
        pois[i] = null;
        continue;
      }

      let nomT = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4);
      let nomU = (x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3);
      let t = nomT / den;
      let u = -nomU / den;

      if (t > 0 && t < 1 && u > 0) {
        pois[i] = [x1 + t * (x2 - x1), y1 + t * (y2 - y1)];
      } else {
        pois[i] = null;
      }
    }
    this.findClosestPoi(pois);
  }

  findClosestPoi(pois) {
    let idx = 0;
    let minDist = Infinity;
    if (pois.every(ele => ele === null)) {
      this.poi = null;
    } else {
      for (var i = 0; i < pois.length; i++) {
        if (pois[i] != null) {
          let d = dist(this.x, this.y, pois[i][0], pois[i][1]);
          if (d < minDist) {
            minDist = d;
            idx = i;
          }
        }
      }
      this.poi = pois[idx];
    }
    this.setV();
  }

  setV() {
    if (this.poi == null) {
      this.v = p5.Vector.fromAngle(this.angle, 1000);
    } else {
      this.v.x = this.poi[0] - this.x;
      this.v.y = this.poi[1] - this.y;
    }
  }
}