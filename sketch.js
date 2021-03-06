var s;
var ps;
let scl = 75;
let apples = [];
let pens = [];
let tomatos = [];
let goldens = [];
let pikoscore = 0;
let psyscore = 0;
let time;
let timeperiod = 2000;
let pikotaropic;
let applepic;
let penpic;
let tomatopic;
let goldenapplepic;
let psypic;
let psystartpic;
let pikostartpic;
let wasdpic;
let arrowpic;
let arrowpointpic;
let songsound;
let positivsound;
let negativesound;
let ppapvideo;
let psyvideo;
let state = true;
let menu;
let rulesbutton;
let backbutton;
let startbutton;
let menustate = false;
let playstate = 0;
let newtime = 0;



function preload() {
  pikotaropic = loadImage("images/PIKOTAROEDITED.png");
  applepic = loadImage("images/APPLE.png");
  penpic = loadImage("images/PEN.png");
  goldenapplepic = loadImage("images/GOLDENAPPLE.png");
  tomatopic = loadImage("images/TOMATO.png");
  psypic = loadImage("images/PSYEDITED.png");
  wasdpic = loadImage("images/WASD.png");
  arrowpic = loadImage("images/ARROW.png");
  arrowpointpic = loadImage("images/ArrowPoint.png");

  psystartpic = loadImage("images/PSY_START.png");
  pikostartpic = loadImage("images/PPAP_START.png");

  songsound = loadSound("sounds/PPAP_SONG.mp3");
  positivsound = loadSound("sounds/COLLECT_POINT.mp3");
  negativesound = loadSound("sounds/COLLECT_ENEMY.mp3");
}

function setup() {
  angleMode(DEGREES);
  createCanvas(1425, 825);
  background(51);
  ppapvideo = createVideo("video/PPAP_VIDEO.mp4");
  psyvideo = createVideo("video/PSY.mp4");
  ppapvideo.hide();
  psyvideo.hide();
  image(psystartpic, width - 600, height - 600, 500, 600);
  image(pikostartpic, 50, height - 600, 500, 600);
  push();
  stroke(255, 50, 100);
  strokeWeight(6);
  textSize(105);
  textAlign(CENTER);
  text("PPAP-GAME", width / 2, 150);
  pop();
  menu = createButton("Go to rules");
  let col = color(255, 50, 100);
  menu.style("background-color", col);
  menu.style("font-size", "30px")
  menu.size(200, 100);
  menu.position(width / 2 - 100, height / 2 - 50);
  menu.mousePressed(rules);
  push();
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text("Please use fullscreen", width / 2, height - 325);
  pop();

  s = new PiKo(pikotaropic);
  ps = new Psy(psypic);
  frameRate(10);
  for (var i = 0; i < 5; i++) {
    pickLocationApples(i);
  }
  for (var i = 0; i < 3; i++) {
    pickLocationTomatos(i);
  }
  for (var i = 0; i < 5; i++) {
    pickLocationPens(i);
  }
  for (var i = 0; i < 2; i++) {
    pickLocationGoldens(i);
  }
  time = millis();
}

function pickLocationPens(i) {
  let cols = floor(width / scl);
  let rows = floor(height / scl);
  pens[i] = createVector(int(random(cols)), int(random(rows)));
  pens[i].mult(scl);
}

function pickLocationApples(i) {
  let cols = floor(width / scl);
  let rows = floor(height / scl);
  apples[i] = createVector(int(random(cols)), int(random(rows)));
  apples[i].mult(scl);
}

function pickLocationTomatos(i) {
  let cols = floor(width / scl);
  let rows = floor(height / scl);
  tomatos[i] = createVector(int(random(cols)), int(random(rows)));
  tomatos[i].mult(scl);
}


function pickLocationGoldens(i) {
  let cols = floor(width / scl);
  let rows = floor(height / scl);
  goldens[i] = createVector(int(random(cols)), int(random(rows)));
  goldens[i].mult(scl);
}

function rules() {
  push();
  background(51);
  menu.hide();
  fill(255);
  textSize(100);
  textAlign(CENTER);
  text("Rules:", width / 2, 150);
  image(wasdpic, width / 6, 250, 100, 100);
  textSize(32);
  textAlign(LEFT);
  text("Use W,A,S,D to move Piko Taro (top left).", width / 3 - 75, 325);
  image(arrowpic, width / 6, 400, 115, 100);
  text("Use up, down, left, right /- arrow keys to move Psy (bottom right).", width / 3 - 75, 475);
  image(pikotaropic, 75, 75, 75, 75);
  image(psypic, width - 75 - 75, height - 75 - 75, 75, 75);
  push();
  translate(120 + 75, 120 + 75);
  rotate(90);
  image(arrowpointpic, -30, 0, 50, 50);
  pop();
  push();
  translate(width - 75 - 75, height - 75 - 75);
  rotate(-90);
  image(arrowpointpic, 0, -75, 50, 50);
  pop();
  rulesbutton = createButton("Go to scoring");
  rulesbutton.position(width / 2 - 100, height - 250);
  rulesbutton.style("background-color", color(255, 50, 100));
  rulesbutton.style("font-size", "30px");
  rulesbutton.size(200, 100);
  rulesbutton.mousePressed(scoringboard);
  pop();
}

function scoringboard() {
  push();
  background(51);
  rulesbutton.hide();
  push();
  backbutton = createButton("Back to rules");
  backbutton.position(width - 300, height / 3);
  backbutton.style("background-color", color(255, 50, 100));
  backbutton.style("font-size", "30px");
  backbutton.size(200, 100);
  backbutton.mousePressed(back);
  pop();
  push();
  startbutton = createButton("Start the game!");
  startbutton.position(width - 300, height / 2 + 100);
  startbutton.style("background-color", color(255, 50, 100));
  startbutton.style("font-size", "30px");
  startbutton.size(200, 100);
  startbutton.mousePressed(execute);
  fill(255);
  textSize(14);
  textAlign(LEFT);
  text("Please turn up your volume", width - 285, height / 2 + 225);
  pop();
  fill(255);
  textSize(100);
  textAlign(CENTER);
  text("Scoring:", width / 2, 150);
  textAlign(LEFT);
  image(applepic, width / 3 + 50, 225, 100, 100);
  textSize(50);
  text("= 1 point.", width / 2, 300);
  image(goldenapplepic, width / 3 + 50, 375, 100, 100);
  text("= 3 points.", width / 2, 450);
  image(penpic, width / 3 + 50, 525, 100, 100);
  text("= 1 point.", width / 2, 600);
  image(tomatopic, width / 3 + 50, 675, 100, 100);
  text("= -2 points.", width / 2, 750);
  pop();
}

function back() {
  backbutton.hide();
  startbutton.hide();
  rules();
}

function execute() {
  backbutton.hide();
  startbutton.hide();
  menustate = true;
}


function draw() {
  if (menustate) {

    if (playstate < 1) {
      songsound.play();
      playstate++;
    }
    newtime += 0.1;
    menu.hide();
    background(51);
    s.show();
    s.update();
    ps.show();
    ps.update();

    if (state) {
      if (millis() > time + timeperiod) {
        for (var i = 0; i < apples.length; i++) {
          pickLocationApples(i);
        }
        for (var i = 0; i < tomatos.length; i++) {
          pickLocationTomatos(i);
        }
        for (var i = 0; i < pens.length; i++) {
          pickLocationPens(i);
        }
        for (var i = 0; i < goldens.length; i++) {
          pickLocationGoldens(i);
        }
        time = millis();
      }
    }

    for (var i = 0; i < tomatos.length; i++) {
      if (s.eat(tomatos[i])) {
        pikoscore -= 2;
        time = millis();
        pickLocationTomatos(i);
        negativesound.play();
      }
    }

    for (var i = 0; i < pens.length; i++) {
      if (s.eat(pens[i])) {
        pikoscore += 1;
        time = millis();
        pickLocationPens(i);
        positivsound.play();
      }
    }

    for (var i = 0; i < apples.length; i++) {
      if (s.eat(apples[i])) {
        pikoscore += 1;
        time = millis();
        pickLocationApples(i);
        positivsound.play();
      }
    }

    for (var i = 0; i < goldens.length; i++) {
      if (s.eat(goldens[i])) {
        pikoscore += 3;
        time = millis();
        pickLocationGoldens(i);
        positivsound.play();
      }
    }

    for (var i = 0; i < tomatos.length; i++) {
      if (ps.intersects(tomatos[i])) {
        psyscore -= 2;
        time = millis();
        pickLocationTomatos(i);
        negativesound.play();
      }
    }

    for (var i = 0; i < pens.length; i++) {
      if (ps.intersects(pens[i])) {
        psyscore += 1;
        time = millis();
        pickLocationPens(i);
        positivsound.play();
      }
    }
    for (var i = 0; i < goldens.length; i++) {
      if (ps.intersects(goldens[i])) {
        psyscore += 3;
        time = millis();
        pickLocationGoldens(i);
        positivsound.play();
      }
    }
    for (var i = 0; i < apples.length; i++) {
      if (ps.intersects(apples[i])) {
        psyscore += 1;
        time = millis();
        pickLocationApples(i);
        positivsound.play();
      }
    }

    let t = floor(timeperiod - (millis() - time));
    fill(255);
    text(t, width - 30, height - 10);


    for (t of tomatos) {
      image(tomatopic, t.x, t.y, scl, scl);
    }
    for (p of pens) {
      image(penpic, p.x, p.y, scl, scl);
    }
    for (a of apples) {
      image(applepic, a.x, a.y, scl, scl);
    }
    for (g of goldens) {
      image(goldenapplepic, g.x, g.y, scl, scl);
    }

    if (newtime > 32.6) {
      state = false;
      fill(51);
      rect(0, 0, width, height);
      noStroke();
      if (psyscore > pikoscore) {
        image(psyvideo, width - 750, 150, 600, 600);
        psyvideo.loop();
      } else if (pikoscore > psyscore) {
        image(ppapvideo, width - 750, 150, 600, 600);
        ppapvideo.loop();
      } else if (pikoscore == psyscore) {
        image(ppapvideo, width - 750, 150, 600, 600);
        ppapvideo.loop();
      }
      noStroke();
      fill(255);
      textSize(32);
      text("Piko Taro has " + pikoscore + " points", 50, 100);
      text("Psy has " + psyscore + " points", 50, 200);

      if (psyscore > pikoscore) {
        fill(255, 100, 100);
        noStroke();
        textSize(60);
        text("Psy is the winner!!", 50, 350);
      } else if (psyscore < pikoscore) {
        fill(255, 100, 100);
        noStroke();
        textSize(60);
        text("Piko Taro is the winner!!", 50, 350);
      } else if (psyscore == pikoscore) {
        fill(100, 200, 100);
        noStroke();
        textSize(60);
        text("There is no winner!!", 50, 350);
      }
    }
  }
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    ps.dir(0, -1);
  } else if (keyCode == DOWN_ARROW) {
    ps.dir(0, 1);
  } else if (keyCode == LEFT_ARROW) {
    ps.dir(-1, 0);
  } else if (keyCode == RIGHT_ARROW) {
    ps.dir(1, 0);
  }
  if (keyCode == 87) {
    s.dir(0, -1);
  } else if (keyCode == 68) {
    s.dir(1, 0);
  } else if (keyCode == 83) {
    s.dir(0, 1);
  } else if (keyCode == 65) {
    s.dir(-1, 0);
  }
}