// Code in this function is run once, when the sketch is started.
let cnv;
let times = 0;
let hittimes = 0;
const WELCOME = 0;
const READY = 1;
const SHOOTING = 2;
const END = 3;

let virus, ready, ball;

let gameState = WELCOME;

function setup() {
  angleMode(DEGREES);
  cnv = createCanvas(600, 600);
  cnv.parent("canvas-container");

  virus = new Virus();
  ready = new Ready();
  ball = new Ball();

}

function draw() {
  background(0);

  if (hittimes >= 3 || times >= 5) {
    gameState = END;
  }


  if (gameState === WELCOME) {
    push();
    fill(155);
    // stroke(255);
    textSize(50);
    textAlign(CENTER, CENTER);
    // text('WELCOME', width / 2, height / 2);
    text('WELCOME', width / 2, height / 2 - 60);
    textSize(20);
    text('Instruction: press the Space to launch the ball.', width / 2, height / 2 + 10);
    text('Hit 3 times out of 5 would win.', width / 2, height / 2 + 40);
    pop();


  } else if (gameState === END) {
    if (hittimes >= 3) {
      fill(155);
      stroke(255);
      textSize(50);
      textAlign(CENTER, CENTER);
      text('YOU WIN:)', width / 2, height / 2);

      // button = createButton('RESTART');
      // button.position(width / 3, height / 2);
      // button.mousePressed(reset);


    } else if (times >= 5) {
      fill(155);
      stroke(255);
      textSize(50);
      textAlign(CENTER, CENTER);
      text('YOU LOSE:(', width / 2, height / 2);
    }


  } else if (gameState === READY) {

    ready.move();
    ready.draw();

    virus.distractFrom(ready.center, ready.length);
    virus.move();
    virus.checkBorder();
    virus.draw();


  } else if (gameState === SHOOTING) {
    virus.move();
    virus.checkBorder();
    virus.draw();

    ball.move();
    ball.checkBorder();
    ball.draw();

    if (virus.checkCollision(ball.pos, ball.size)) {
      console.log("hit virus");
      hittimes++;
      times++;
      virus.fade();
      gameState = READY;
      console.log(hittimes, times);
    }

    if (ball.checkFallout()) {
      console.log("you stupid piece of shit")
      times++;
      gameState = READY;
      console.log(times);
    }
  }

}


function keyPressed() {
  if (gameState === WELCOME) {
    gameState++;
  } else if (gameState === READY) {
    ball.setPosition(ready.actualPos);
    ball.setVelocity(ready.pos.copy().mult(0.1));
    gameState++;

  }
}

// function reset() {
//   times = 0;
//   hittimes = 0;

//   gameState = WELCOME;
//   console.log('reset')
// }
