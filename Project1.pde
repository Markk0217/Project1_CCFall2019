// my adj for Project 1 is "struggle"

class light {
  PVector pos = new PVector(0, 0, 0);
  PVector vel = new PVector(0, 0, 0);
  PVector acc = new PVector(0, 0, 0);
  float r = 5;
  light(PVector pos, PVector vel) {
    this.pos = pos;
    this.vel = vel;
  }
  void run() {
    if (pos.x < 0) vel.x = -vel.x;
    if (pos.x > width) vel.x = -vel.x;
    if (pos.y < 0) vel.y = -vel.y;
    if (pos.y > height) vel.y = -vel.y;
    vel.add(acc);
    pos.add(vel);
    noStroke();
    rect(pos.x, pos.y, r, r);
  }
}

light lights[][] = new light[60][600]; 
int n =0;
int c;
int time = 1;
void setup() {
  size(600, 600);
  colorMode(HSB);
  background(0);
  frameRate(60);
  float vel0 = 4;
  for (int i=0; i<60; i++) {
    PVector vel = new PVector();
    float theta = i * 2*PI/60;
    vel.x = vel0 * cos(theta);
    vel.y = vel0 * sin(theta);
    for (int j=0; j<600; j++) {
      lights[i][j] = new light(new PVector(width/2, height/2), vel);
    }
  }
}
void draw() {
  fill(0, 0, 0, 20);
  rect(0, 0, width, height);
  n = 50 + time % 200;
  int o = int(time)%300;
  if (c >= 255)  c=0;  
  else  c++;
  int co = (int)map(mouseY,0,height,0,255);
  fill(c, co, 255);
  int xxx =(int) map(mouseX,0,width,0,60);
  for (int i=0; i<xxx; i+=1) {
    for (int j=0+o; j<n+o; j++) {
      lights[i][j].run();
    }
  }
  time++;
} 
