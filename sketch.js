
//Position of left hand side of floor
let base1;

//Position of right hand side of floor
let base2;
//Length of floor
//let baseLength;

// Variables related to moving ball
let position;
let position_target;
let velocity;
let r = 6;
let speed = 7.5;
angleMode(RADIANS);

function setup() {
  // createCanvas(710, 400);
  createCanvas(0.99*windowWidth, 0.99*windowHeight);
  fill(128);
  base1 = createVector(0, height - 150);
  base2 = createVector(width, height);
  //createGround();

  //start ellipse at middle top of screen
  position = createVector(width/2, 0);

  position_target = createVector(random(0.2*width, 0.8*width), random(0.1*height, 0.5*height));

  //calculate initial random velocity
  velocity = p5.Vector.random2D();
  velocity.mult(speed);
  score = 0;
}

function draw() {
  //draw background

  fill(0, 12);
  noStroke();
  rect(0, 0, width, height);



  controller = height*0.25*sin((winMouseX - 0.5*width)/width)
  //randomize base top
  base1.y = 0.75*height + controller;
  base2.y = 0.75*height - controller;

  //draw base
  fill(200);
  quad(base1.x, base1.y, base2.x, base2.y, base2.x, height, 0, height);

  let sName = 'ANGLENOID version 0.0.3';
  textSize(40);
  text(sName, 10, 30);
  fill(0, 102, 153);
  text(sName, 10, 60);
  fill(0, 102, 153, 51);
  text(str(score), 10, 90);


  //calculate base top normal
  let baseDelta = p5.Vector.sub(base2, base1);
  baseDelta.normalize();
  let normal = createVector(-baseDelta.y, baseDelta.x);
  let intercept = p5.Vector.dot(base1, normal);

  //draw ellipse
  noStroke();
  fill(255);
  ellipse(position.x, position.y, r * 2, r * 2);

    //draw ellipse
  noStroke();
  fill(255);
  ellipse(position_target.x, position_target.y, r * 10, r * 10);

  //move ellipse
  position.add(velocity);

  //normalized incidence vector
  incidence = p5.Vector.mult(velocity, -1);
  incidence.normalize();

  // detect and handle collision with base
  if (p5.Vector.dot(normal, position) > intercept) {
    //calculate dot product of incident vector and base top
    let dot = incidence.dot(normal);

    //calculate reflection vector
    //assign reflection vector to direction vector
    velocity.set(
      2 * normal.x * dot - incidence.x,
      2 * normal.y * dot - incidence.y,
      0
    );
    velocity.mult(speed);

    // draw base top normal at collision point
    stroke(255, 128, 0);
    line(
      position.x,
      position.y,
      position.x - normal.x * 100,
      position.y - normal.y * 100
    );
  }
  //}

  // detect boundary collision
  // right
  if (position.x > width - r) {
    position.x = width - r;
    velocity.x *= -1;
  }
  // left
  if (position.x < r) {
    position.x = r;
    velocity.x *= -1;
  }
  // top
  if (position.y < r) {
    position.y = r;
    velocity.y *= -1;


  }

    // left
  if (abs(position.x - position_target.x) < 5*r) {

  if (abs(position.y - position_target.y) < 5*r) {
    position_target = createVector(random(0.2*width, 0.8*width), random(0.1*height, 0.5*height));
    score = score + 1;

  }
 }
}

