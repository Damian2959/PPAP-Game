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
let songsound;
let positivsound;
let negativesound;
let ppapvideo;
let psyvideo;
let state = true;
let menu;
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

  psystartpic = loadImage("images/PSY_START.png");
  pikostartpic = loadImage("images/PPAP_START.png");

  songsound = loadSound("sounds/PPAP_SONG.mp3");
  positivsound = loadSound("sounds/COLLECT_POINT.mp3");
  negativesound = loadSound("sounds/COLLECT_ENEMY.mp3");
}

function setup() {
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
  menu = createButton("Start the game");
  let col = color(255, 50, 100);
  menu.style("background-color", col);
  menu.style("font-size", "30px")
  menu.size(200, 100);
  menu.position(width / 2 - 100, height / 2 - 50);
  menu.mousePressed(execute);

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

function execute() {
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
        pikoscore -= 3;
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
        pikoscore += 1;
        time = millis();
        pickLocationGoldens(i);
        positivsound.play();
      }
    }

    for (var i = 0; i < tomatos.length; i++) {
      if (ps.intersects(tomatos[i])) {
        psyscore -= 4;
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
        psyscore += 1;
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

    if (ps.intersects(goldens)) {
      psyscore += 3;
      time = millis();
      pickLocationGolden();
      positivsound.play();
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