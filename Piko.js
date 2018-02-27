class PiKo {
  constructor(img) {
    this.x = 0;
    this.y = 0;
    this.xspeed = 0;
    this.yspeed = 0;
    this.piko = img;
  }

  dir(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  update() {
    this.x += this.xspeed * scl;
    this.y += this.yspeed * scl;

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  }

  eat(pos) {
    let d = dist(this.x, this.y, pos.x, pos.y);
    return (d < 4);
  }
  show() {
    image(this.piko, this.x, this.y, scl, scl);
  }
}