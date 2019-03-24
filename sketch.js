
//Position of left hand side of floor
let base1;

//Position of right hand side of floor
let base2;
//Length of floor
//let baseLength;

// Variables related to moving ball
let position;
let position_target;
let position_enemy;
let velocity_enemy;

let velocity;
//let scale = 1900/windowWidth;
//let r = 6*scale;
//let speed = 7.5*scale;
let r = 6;
let speed = 10.5;
angleMode(RADIANS);

function setup() {
  // createCanvas(710, 400);
  createCanvas(windowWidth, 0.9*windowHeight);
  pixelDensity(0.25);
  fill(128);
  base1 = createVector(0, height - 150);
  base2 = createVector(width, height);
  //createGround();

  //start ellipse at middle top of screen
  position = createVector(width/2, 0);

  position_target = createVector(random(0.2*width, 0.8*width), random(0.1*height, 0.5*height));
  
  position_enemy = createVector(random(0.2*width, 0.8*width), random(0.1*height, 0.5*height));
  

  //calculate initial random velocity
  velocity = p5.Vector.random2D();
  velocity.mult(speed);
  
  velocity_enemy = p5.Vector.random2D();
  velocity_enemy.mult(0.2*speed);
  
  
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

  let sName = 'ANGLENOID v0.1.1';
  textSize(90);
  //text(sName, 10, 30);
  fill(0, 102, 153);
  text(sName, 300, 90);
  fill(255, 204, 0);
  text(str(score), 10, 90);


  //calculate base top normal
  let baseDelta = p5.Vector.sub(base2, base1);
  baseDelta.normalize();
  let normal = createVector(-baseDelta.y, baseDelta.x);
  let intercept = p5.Vector.dot(base1, normal);

  //draw ellipse
  noStroke();
  fill(255);
  ellipse(position.x, position.y, r * 10 + score, r * 10 + score);

    //draw target
  noStroke();
  fill(255, 204, 0);
  ellipse(position_target.x, position_target.y, r * 5, r * 5);
  
  
  //draw enemy
  noStroke();
  fill(255, 0, 0);
  ellipse(position_enemy.x, position_enemy.y, r * 15, r * 15); 
  

  //move ellipse
  position.add(velocity);
  position_enemy.add(velocity_enemy)
  
  velocity_enemy =  createVector(position.x - position_enemy.x, position.y - position_enemy.y)
  velocity_enemy.normalize()
  velocity_enemy.mult(0.2*speed);
  
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
    position.add(velocity);
    
    // draw base top normal at collision point
    stroke(255, 128, 0);
    line(
      position.x,
      position.y,
      position.x - normal.x * 100,
      position.y - normal.y * 100
    );
    noStroke();
    fill(0, 0, 255);
    ellipse(position.x, position.y, r * 15, r * 15);
  }
  //}

  // detect boundary collision
  // right
  if (position.x > width - r) {
    position.x = width - r;
    velocity.x *= -1;
    noStroke();
    fill(0, 0, 255);
    ellipse(position.x, position.y, r * 15, r * 15);
  }
  // left
  if (position.x < r) {
    position.x = r;
    velocity.x *= -1;
    noStroke();
    fill(0, 0, 255);
    ellipse(position.x, position.y, r * 15, r * 15);
  }
  // top
  if (position.y < r) {
    position.y = r;
    velocity.y *= -1;
    noStroke();
    fill(0, 0, 255);
    ellipse(position.x, position.y, r * 15, r * 15);

  }

    // left
  if (abs(position.x - position_target.x) < 9*r) {

  if (abs(position.y - position_target.y) < 9*r) {
    noStroke();
    fill(0, 255, 0);
    ellipse(position_target.x, position_target.y, r * 15, r * 15);
    position_target = createVector(random(0.2*width, 0.8*width), random(0.1*height, 0.5*height));
    score = score + 1;
    noStroke();
    fill(255, 204, 0);
    ellipse(position_target.x, position_target.y, r * 15, r * 15);

  }
 }
}

