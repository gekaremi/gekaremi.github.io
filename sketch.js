/*based on:
 * @name Follow 1
 * @frame 710,400
 * @description A line segment is pushed and pulled by the cursor.
 * Based on code from Keith Peters.
 */
let x = 100,
  y = 100;

let font, fontsize = 80;

let lines = []; //для предложений

let x1 = 0, //для движения фона
  x2, scrollSpeed = 4;

 let score = 0
   age = 0;
 let delta_score = 0;


function preload() {
  trueLines = loadStrings('true_fin.txt');
  falseLines = loadStrings('false_fin1.txt');
  neutralLines = loadStrings('neutral_fin.txt');


  good_head_img = loadImage('assets/sprites/good.png');
  sad_head_img = loadImage('assets/sprites/sad.png');
  philosoph_head_img = loadImage('assets/sprites/philosoph.png');

  bg_img = loadImage("assets/sprites/bg.png");
  font = loadFont('assets/fonts/Gecko_PersonalUseOnly.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(20.0);
  frameRate(30);
  pixelDensity(0.5);
  //stroke(255, 100);
    // set up the font
  textFont(font);
  textSize(fontsize);
  for (let i = 0; i < 11; i++) {
    lines.push(new Line(trueLines, falseLines, neutralLines, i));
  }

  x2 = width; //для движения фона

  head_img = good_head_img;
}

function draw() {
  image(bg_img, x1, 0, 2*height, height);
  image(bg_img, x2, 0, 2*height, height);
  
  x1 -= scrollSpeed ;
  x2 -= scrollSpeed;
  
  if (x1 < -width){
    x1 = width;
  }
  if (x2 < -width){
    x2 = width;
  }

  x = mouseX; 
  y = mouseY;

  image(head_img, 200, y - head_img.width / 2);

  for (let i = 0; i < lines.length; i++) {
  	lines[i].collision(200, y, 50, trueLines, falseLines, neutralLines);
    lines[i].move(trueLines, falseLines, neutralLines);
    lines[i].display();
  }

   fill(255);
   textSize(200);
   fill(0, 255, 0);
   text(score, 100, 200);

   fill(0, 0, 255);
   text(delta_score, 500, 200);

   fill(255, 0, 0);
   text(int(101 - age), width - 300, 200);

   age = age + 0.05;
   if (age > 101) {
   background(0);
   textSize(300);
   fill(255, 0, 0);
   text('КОНЕЦ ИГРЫ', 250, 400);

   fill(0, 0, 255);
   textSize(160);
   text('вы прекратили учиться', 130, 600);

   fill(0, 255, 0);
   textSize(300);
   text(('IQ: ' + str(score)), 700, 900);
   noLoop();}
}



class Line {
  constructor(trueLines, falseLines, neutralLines, i) {
  	this.line = i;
  	this.y = (this.line+1)*0.1*height;
    this.x = 1*width + 4*random(width);
    this.speed = age/7 + random(7,14);
    let j = int(random(0, 3)) - 1;
    this.bonus = j;
    //console.log(i, j);
	switch(j) {
	  case -1: 
	    this.message = falseLines[i];
	    console.log(-1, i, j, this.message);
	    break;
	  case 0: 
	    this.message = neutralLines[i];
	    console.log(0, i, j, this.message);
	    break;
	  case 1:
	  	this.message = trueLines[i];
	  	console.log(1, i, j, this.message);
	  	break;
	}

	
  }


  respawn(trueLines, falseLines, neutralLines) {
    this.x = 1*width + 4*random(width);
    this.speed = age/7 + random(7,14);
    let j = int(random(0, 3)) - 1;
    this.bonus = j;
    //console.log(i, j);
	switch(j) {
	  case -1: 
	    this.message = falseLines[int(random(falseLines.length))];
	    break;
	  case 0: 
	    this.message = neutralLines[int(random(neutralLines.length))];
	    break;
	  case 1:
	  	this.message = trueLines[int(random(trueLines.length))];
	    break;
	}


   	}

  move(trueLines, falseLines, neutralLines) {
    this.x = this.x - this.speed;
      if ( this.x < -500 ) {
   	   this.respawn(trueLines, falseLines, neutralLines); 
    	}
  	}

  display() {
  	fill(255);
  	textSize(50 + 3*int(this.speed));
    text(this.message, this.x, this.y);
  	}

  collision(target_x, target_y, distance, trueLines, falseLines, neutralLines) {
    if ( (abs(this.x -target_x) < 4*distance) && (abs(this.y - target_y) < distance) ) {
       score += this.bonus;
       switch(this.bonus) {
	   case -1: 
	     head_img = sad_head_img;
	     delta_score = -int(random(1,10));
	     break;
	   case 0: 
	     head_img = philosoph_head_img;
	      delta_score = int(random(-5,15));
	     break;
	   case 1:
	  	 head_img = good_head_img;
	  	 delta_score = int(random(5,10));
	     break;
	    }

		score += delta_score;
   	   this.respawn(trueLines, falseLines, neutralLines); 
       }
	}
}
