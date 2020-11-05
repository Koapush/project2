// Code in this function is run once, when the sketch is started.
let cnv;
let times = 5;
let hittimes = 0;
const WELCOME = 0;
const READY = 1;
const SHOOTING = 2;
const END = 3;

let virus, ready, ball;
let gameState = WELCOME;

let wallSound;
let winSound;
let loseSound;
let hitSound;
let fallSound;

function preload() {
  console.log("preloading!!");
  wallSound = loadSound('sound/wallbounce.mp3');
  winSound = loadSound('sound/finalwin.mp3');
  loseSound = loadSound('sound/finallose.mp3');
  hitSound = loadSound('sound/hit.mp3');
  fallSound = loadSound('sound/fall.mp3');

}



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

  if (hittimes >= 3 || times <= 0) {
    gameState = END;
  }

  if (gameState === WELCOME) {
    push();
    fill(155);
    // stroke(255);
    textSize(40);
    textAlign(CENTER, CENTER);
    // text('Dear health guard ', width / 2, height / 2);
    text('DONT LET ME DOWN', width / 2, height / 2 - 60);
    textSize(20);
    text('Instruction: press the Space to launch the ball.', width / 2, height / 2 + 10);
    text('Hit the virus 3 times out of 5 to win.', width / 2, height / 2 + 40);
    pop();

  } else if (gameState === END) {

    if (hittimes >= 3) {
      fill(155);
      stroke(255);
      textSize(50);
      textAlign(CENTER, CENTER);
      text('YOU WIN :)', width / 2, height / 2);

    } else if (times <= 0) {
      fill(155);
      stroke(255);
      textSize(50);
      textAlign(CENTER, CENTER);
      text('YOU LOSE :(', width / 2, height / 2);

    }

    button = createButton('RESTART');
    button.position(300, 350);
    button.mousePressed(reset);

  } else if (gameState === READY) {
    ready.move();
    ready.draw();
    ready.times();

    virus.distractFrom(ready.center, ready.length);
    virus.move();
    virus.checkBorder();
    virus.draw();

  } else if (gameState === SHOOTING) {
    ready.times();

    virus.move();
    virus.checkBorder();
    virus.draw();

    ball.move();
    ball.checkBorder();
    ball.draw();

    if (virus.checkCollision(ball.pos, ball.size)) {
      console.log("hit virus");
      hittimes++;
      times--;
      virus.fade();
      gameState = READY;
      console.log(hittimes, times);
      hitSound.play()

    }

    if (ball.checkFallout()) {
      console.log("noooo")
      times--;
      gameState = READY;
      console.log(times);
      fallSound.play();

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

function reset() {
  location.reload();
}
