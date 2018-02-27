class Psy {
  constructor(img) {
    this.x = width - scl;
    this.y = height - scl;
    this.xspeed = 0;
    this.yspeed = 0;
    this.psy = img;
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

  intersects(pos) {
    let d = dist(this.x, this.y, pos.x, pos.y);
    return (d < 4);
  }

  show() {
    image(this.psy, this.x, this.y, scl, scl);
  }
}