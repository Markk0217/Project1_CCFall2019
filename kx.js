let lights = [];
let n = 0;
let c = 0;
let time = 1;

function setup() {
  createCanvas(600, 600);
  background(0);
  frameRate(80);

  for(let i = 0; i<60; ++i){
    let arr = [];
    for(let j = 0 ; j < 600; ++j){
      arr.push(new light());
    }
    lights.push(arr);
  }

  let vel0 = 4;
  for (let i=0; i<60; i++) {
    let vel = createVector(0, 0, 0);
    let theta = i * 2*PI/60;
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
  let o = int(time)%300;
  if ( c>= 255)  c=0;
  else  c++;
  let co = int(constrain(map(mouseY,0,height,0,255),0,255));
  colorMode(HSB);
  fill(c, co, 255);
  let xxx =int( constrain(map(mouseX,0,width,0,60), 0,60));
  for (let i=0; i<xxx; i+=1) {
    for (let j=0+o; j<n+o; j++) {
      lights[i][j].run();
    }
  }
  time++;
}


class light{
  constructor(_pos = createVector(0, 0, 0),_vel = createVector(0, 0, 0)){
    this.pos = _pos;
    this.vel = _vel;
    this.acc = createVector(0, 0, 0);
    this.r = 5;
  }
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
