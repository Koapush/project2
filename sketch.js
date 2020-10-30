let ball = {
  x: 200,
  y: 0,
  xspeed: 3.5,
  yspeed: 3.5
}

let blockWidth = 100;
let blockHeight = 10;

let obj;

function setup() {
  createCanvas(500, 400);
  noStroke();

  obj = {
    x: 250 + 70 * cos(frameCount / 50),
    y: 100 + 70 * sin(frameCount / 50),
    w: 50,
    h: 50,
  };
}

function draw() {
  angleMode(DEGREES)
  background(0);
  move();
  bounce();
  display();
  bounceBlock();
  fill(255)
  rect(mouseX, 350, blockWidth, blockHeight, 10)

  covid();
}

function move() {
  ball.x = ball.x + ball.xspeed;
  ball.y = ball.y + ball.yspeed;
}

function bounce() {
  if (ball.x > width || ball.x < 0) {
    ball.xspeed *= (-1);
  }
  if (ball.y < 0) {
    ball.yspeed *= (-1);
  }
  if (ball.y > height) {
    fill(255);
    text("Defeat", 240, 200, 20)
  }
}

function display() {
  fill(0, 20, 200);
  ellipse(ball.x, ball.y, 25, 25);
}

function bounceBlock() {
  if (mouseX < ball.x && ball.x < mouseX + blockWidth && ball.y > 350) {
    ball.yspeed *= -1;
  }
}



function covid() {
  console.log(frameCount);
  obj.x = 250 + 80 * cos(frameCount);
  obj.y = 120 + 80 * sin(frameCount);
  //eye
  fill(255, 0, 255)
  ellipse(obj.x, obj.y, obj.w, obj.h);
  fill("white")
  ellipse(obj.x, obj.y, 30, 30)

  //little yellow stuff
  for (let i = 0; i < 10; i += 1) {
    fill("yellow")
    let x = random(obj.x - 20, obj.x + 20);
    let y = random(obj.y - 20, obj.y + 20);
    ellipse(x, y, random(5, 10), random(5, 10));
  }
  //peng
  if (ball.x > obj.x && ball.x < obj.x + obj.w && ball.y > obj.y && ball.y < obj.y + obj.h) {
    fill(255, 0, 0)
    ellipse(obj.x, obj.y, obj.w, obj.h);
    text("Yay!", obj.x + 50, obj.y + 30, 20)
  }

}
//眼珠；yay的时常；改变球的路径/调整板的角度，可玩性；会自己跳上来
