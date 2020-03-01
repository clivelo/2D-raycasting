let slider;
let val = 5;
let walls = new Array(val + 4);
let rays = new Array(120);

function setup() {
  createCanvas(500, 400);
  slider = createSlider(0, 20, 5, 1);
  slider.changed(sliderChanged);
  createWalls();
  for (var r = 0; r < rays.length; r++) {
    rays[r] = new Ray(TWO_PI / rays.length * r);
  }
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(1);

  for (var w = 0; w < walls.length; w++) {
    walls[w].show();
  }

  for (var r = 0; r < rays.length; r++) {
    rays[r].intersect();
    if (rays[r].poi != null) {
      push();
      stroke(255, 10, 10);
      strokeWeight(2);
      point(rays[r].poi[0], rays[r].poi[1]);
      pop();
      rays[r].show();
    }
    rays[r].move();
  }
}

function createWalls() {
  for (var w = 0; w < val; w++) {
    walls[w] = new Wall(true);
  }
  walls[walls.length - 4] = new Wall(false, 0, 0, 0, height);
  walls[walls.length - 3] = new Wall(false, 0, 0, width, 0);
  walls[walls.length - 2] = new Wall(false, width, 0, width, height);
  walls[walls.length - 1] = new Wall(false, 0, height, width, height);
}

function keyPressed() {
  if (key == ' ') {
    createWalls();
  }
}

function sliderChanged() {
  val = slider.value();
  walls = new Array(val + 4);
  createWalls();
}