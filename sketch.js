/*
 * @name Follow 1
 * @frame 710,400
 * @description A line segment is pushed and pulled by the cursor.
 * Based on code from Keith Peters.
 */
var x = 100,
  y = 100,
  angle1 = 0.0,
  segLength = 50;

let font,
  fontsize = 60;

let bugs = []; //для предложений

var x1 = 0; //для движения фона
var x2;
var scrollSpeed = 2;


function preload() {
  trueLines = loadStrings('true4.txt');
  head_img = loadImage('assets/sprites/head_placeholder.png'); // Load the image
  bg_img = loadImage("assets/sprites/bg.png");
  font = loadFont('assets/fonts/Gecko_PersonalUseOnly.ttf');

}

function setup() {
  createCanvas(1710, 800);
  strokeWeight(20.0);

  stroke(255, 100);
    // set up the font
  textFont(font);
  textSize(fontsize);
  for (let i = 0; i < 5; i++) {
    bugs.push(new Line(trueLines, i));
  }

  x2 = width; //для движения фона
}

function draw() {
  //background(0);

  image(bg_img, x1, 0, width, height);
  image(bg_img, x2, 0, width, height);
  
  x1 -= scrollSpeed;
  x2 -= scrollSpeed;
  
  if (x1 < -width){
    x1 = width;
  }
  if (x2 < -width){
    x2 = width;
  }

  dx = mouseX - x;
  dy = mouseY - y;
  angle1 = atan2(dy, dx);
  x = mouseX - (cos(angle1) * segLength);
  y = mouseY - (sin(angle1) * segLength);

  segment(x, y, angle1);
  ellipse(x, y, 20, 20);
  image(head_img, x - head_img.width / 2, y - head_img.width / 2);

  //a = a - 1.5;
  //if (a < 0) {
  //  a = width;
 // }
  // text(trueLines[1], a, 100);

  for (let i = 0; i < bugs.length; i++) {
    bugs[i].move();
    bugs[i].display();
  }

}

function segment(x, y, a) {
  push();
  translate(x, y);
  rotate(a);
  line(0, 0, segLength, 0);
  pop();
}

function move_line(x, y, a) {
  text(trueLines[1], x, y);
}

// Jitter class
class Line {
  constructor(trueLines, i) {
    this.x = width +  random(width);
    this.y = random(height);
    //this.message = trueLines[2];
    this.message = trueLines[i];
    this.speed = random(1,4);
  }

  move() {
    this.x = this.x - this.speed 
  }

  display() {
    text(this.message, this.x, this.y);
  }
}