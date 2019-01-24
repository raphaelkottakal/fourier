const x = [];
const y = [];
let fourierX;
let fourierY;

let time = 0;
let wave = [];
let path = [];
const circleOffsetX = 150

function setup() {
  createCanvas(windowWidth, windowHeight);
  // y = [100, 100, 100, -100, -100, -100, 100, 100, 100, -100, -100, -100,100, 100, 100, -100, -100, -100];
  for (let i = 0; i < drawing.length; i += 10) {
    x.push(drawing[i].x);
    y.push(drawing[i].y);
  }
  fourierX = dft(x);
  fourierY = dft(y);

  fourierX.sort((a,b) => b.amp - a.amp);
  fourierY.sort((a,b) => b.amp - a.amp);
}

function dft(x) {
  const X = [];
  const N = x.length;

  for (let k = 0; k < N; k++) {
    let re = 0;
    let im = 0;
    for (let n = 0; n < N; n++) {
      let phi = (TWO_PI * k * n) / N;
      re += x[n] * cos(phi);
      im -= x[n] * sin(phi);
    }
    re = re / N;
    im = im / N;

    const freq = k;
    const amp = sqrt(re * re + im * im);
    const phase = atan2(im, re);

    X[k] = {
      re,
      im,
      freq,
      amp,
      phase
    }
  }
  return X;
}

function epiCycle(x, y, rotation, fourier) {
  for(let i = 0; i < fourier.length; i++) {
    let prevX = x;
    let prevY = y;
    const freq = fourier[i].freq;
    const radius = fourier[i].amp;
    const phase = fourier[i].phase;
    x += radius * cos(freq * time + phase + rotation);
    y += radius * sin(freq * time + phase + rotation);
    
    stroke(255, 100);
    noFill();
    ellipse(prevX, prevY, radius * 2);
    
    
    fill(255);
    ellipse(x, y, 4);
    stroke(255);
    line(prevX, prevY, x, y);
    
  }
  return createVector(x, y);
}

function draw() {
  background(0);

  const vx =  epiCycle(400, 50, 0, fourierX);
  const vy = epiCycle(50, 400, HALF_PI, fourierY);
  const v = createVector(vx.x, vy.y);
  path.unshift(v);
  stroke(255, 100);
  line(vx.x, vx.y, v.x, v.y);
  line(vy.x, vy.y, v.x, v.y);
  
  noFill();
  stroke('hsl(120, 50%, 50%)');
  beginShape();
  for (let i = path.length - 1; i >= 0; i--) {
    vertex(path[i].x, path[i].y);
  }
  endShape();

  const dt = TWO_PI / fourierY.length;

  time += dt;
  if (time > TWO_PI) {
    time = 0;
    console.log(path.length);
    path = [];
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}