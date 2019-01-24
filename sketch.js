// let y = [];
// let fourierY;

let time = 0;
let wave = [];
const circleOffsetX = 150

function setup() {
  createCanvas(windowWidth, windowHeight);
  // y = [100, 100, 100, -100, -100, -100, 100, 100, 100, -100, -100, -100100, 100, 100, -100, -100, -100];
  // fourierY = dft(y);
}

function draw() {
  background(0);
  translate(200, windowHeight / 2);

  x = 0;
  y = 0;

  for(let i = 0; i < 4; i++) {
    let prevX = x;
    let prevY = y;
    const n = i * 2 + 1;
    const radius = 100 * (4 / (n * PI));
    x += radius * cos(n * time);
    y += radius * sin(n *time);
    
    stroke(255, 100);
    noFill();
    ellipse(prevX, prevY, radius * 2);
    
    
    fill(255);
    ellipse(x, y, 4);
    stroke(255);
    line(prevX, prevY, x, y);
    
  }
  wave.unshift(y);
  stroke(255, 100);
  line(x, y, 150, wave[0]);
  
  noFill();
  stroke('hsl(120, 50%, 50%)');
  beginShape();
  for (let i = wave.length - 1; i >= 0; i--) {
    vertex(150 + i, wave[i]);
  }
  endShape();

  
  
  if (wave.length > 500) {
    wave.pop();
  }

  time += 0.02;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}