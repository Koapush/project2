//BUG: restart!!! mouseclick

let r = 100;
let t = 0;
let tStep = 3;
let status = true;
let bouncestatus = false;
let covidstatus = true;
let ang;

let ball = {
  x: 200,
  y: 200,
  r: 25,
  xspeed: 8,
  yspeed: 8
}

let obj;

function setup() {
  createCanvas(400, 400);
  loop();
  obj = {
    x: 250 + 70 * cos(frameCount / 50),
    y: 100 + 70 * sin(frameCount / 50),
    r: 50,
  };
  //为啥写在set up
}



function draw() {
  background(220);
  angleMode(DEGREES);

  storeItem('t', t);

  ready();
  if (bouncestatus == true) {
    bouncing();
  }

  if (covidstatus == true) {
    covid();
  }

  if (dist(ball.x, ball.y, obj.x, obj.y) <= (ball.r / 2 + obj.r / 2)) {
    wingame();
  }
}

function mouseClicked() {
  status = false;
  bouncestatus = true;
  ang = getItem('t');
}


// functions in detail
function ready() {
  // console.log(t);
  t += tStep;
  if (0 < t < 180 && status == true) {
    ball.x = width / 2 + r * cos(t);
    ball.y = height - r * sin(t);

    line(width / 2, height, ball.x, ball.y);
    ellipse(ball.x, ball.y, ball.r, ball.r);
  }

  if (t > 180 || t<0) {
    tStep *= -1;
  }

}

function bouncing() {
  ball.x = ball.x + ball.xspeed * cos(ang);
  ball.y = ball.y - ball.yspeed * sin(ang);
  fill('black');
  ellipse(ball.x, ball.y, ball.r, ball.r);

  if (ball.x > width || ball.x < 0) {
    ball.xspeed *= (-1);
  }
  if (ball.y < 0) {
    ball.yspeed *= (-1);
  }
  if (ball.y > height) {
    losegame();
  }
}

function losegame() {
  text("YOU LOSE", 240, 200, 20);
}


function covid() {
  obj.x = 250 + 80 * cos(frameCount);
  obj.y = 120 + 80 * sin(frameCount);
  // obj.x = random(0, width);
  // obj.y = random(0, height);
  fill(255, 0, 255);
  ellipse(random(obj.x, obj.x + 5), random(obj.y, obj.y + 5), obj.r, obj.r);

  //little yellow stuff
  for (let i = 0; i < 10; i += 1) {
    fill("yellow")
    let x = random(obj.x - 25, obj.x + 25);
    let y = random(obj.y - 25, obj.y + 25);
    ellipse(x, y, random(5, 10), random(5, 10));
    //可以用array! 减速!
  }

}


function wingame() {
  fill(255, 0, 0)
  bouncestatus = false;
  covidstatus = false;
  text("Yay!", obj.x, obj.y, 100);
}
