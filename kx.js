/*

Project 1 for Creative Coding Fall 2019
- The Unexpected Machine: Performance Adjective

Adjective: struggled
- Idea comes from daily frustration of school, works, family issues, relationships, religion practice...
- Start with organized shapes, lines, and grids movements to show that "I" am trying to take control of everything in order;
- Once the mouse moves around the screen, it breaks the harmony and creates chaos and randomn of the shapes;
- It demonstrates that when an outer force interact with "my" life, things start getting out of control and messy;

Commentary about the code:
- Create a firework-effect line starts from the center point to show that "I" have a good and organized plan (everythingn starts good);
- Multiple grids and squares appear right after that, faster and faster, so give a sense of that things get busy but still in control;
- When mouse interacts with the screen, the lines and shapes change throughout movement, to show that "I" am starting to be struggled with life accidents.

Obstacles that I have:
- What is vercor? How should I use it.
  - https://processing.org/reference/PVector.html
  - https://www.youtube.com/watch?v=mWJkvxQXIa8 (Thank you Daniel Shiffman! Really helpful!)
  - Learning Process Chapter 6 about how to use map

- How to use time to make effects changing with time?
  - https://processing.org/reference/libraries/video/Movie_time_.html （for move)

- How to translate Javascript to P5js? (I start writing everything in Processing and took me really a while to traslate them)
  - https://p5js.org/reference/#/p5/translate

*/

//set global variables
let lights = []; // set the array and store the objects for Class light later
let n = 0;
let c = 0;
let time = 1; //initial time

function setup() {
  createCanvas(600, 600);
  background(0);
  frameRate(80); //I tried different frameRate, and 80 is the best number to make sure it's not lagging but also very fluent.

  //initialize the array
  for(let i = 0; i<60; ++i){
    let arr = [];
    for(let j = 0 ; j < 600; ++j){
      arr.push(new light());
    }
    lights.push(arr);
  }

  //store angles of sqaure (x and y) into array
  let vel0 = 4;
  for (let i=0; i<60; i++) {
    let vel = createVector(0, 0, 0);
    let theta = i * 2*PI/60;
    // use cos and sin to store into vectors
    vel.x = vel0 * cos(theta);
    vel.y = vel0 * sin(theta);
    for (let j=0; j<600; j++) {
      lights[i][j] = new light(createVector(width/2, height/2,0), vel);
    }
  }
}

function draw() {
  colorMode(RGB);
  background(0,0,0,20);
  n = 50 + time % 200;

  //change the color with the time
  //new symbol that I learned: % = divide and take the rest
  //e.x. 5%2=1, 4%5=4
  let o = int(time)%300;
  if ( c>= 255)  c=0;
  else  c++;
  //change the color with the height(mouseY)
  let co = int(constrain(map(mouseY,0,height,0,255),0,255));

  //new color mode I learned!
  //Hue: The shade of a color
  //Saturation: The intensity or vividness of a color (sometimes referred to as chroma)
  //Brightness: The amount of white or black present in a color.
  colorMode(HSB);
  fill(c, co, 255);
  //change the color with the width(mouseX)
  let xxx =int( constrain(map(mouseX,0,width,0,60), 0,60));
  for (let i=0; i<xxx; i+=1) {
    for (let j=0+o; j<n+o; j++) {
      lights[i][j].run();
    }
  }
  //time moves on
  time++;
}

//make a class for everyting about the square
class light{
  constructor(_pos = createVector(0, 0, 0),_vel = createVector(0, 0, 0)){
    this.pos = _pos;
    this.vel = _vel;
    this.acc = createVector(0, 0, 0);
    this.r = 5;
  }

  //make the square moves!
  run() {
    if (this.pos.x < 0) this.vel.x = -this.vel.x;
    if (this.pos.x > width) this.vel.x = -this.vel.x;
    if (this.pos.y < 0) this.vel.y = -this.vel.y;
    if (this.pos.y > height) this.vel.y = -this.vel.y;
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    noStroke();
    rect(this.pos.x, this.pos.y, this.r, this.r);
  }
}
