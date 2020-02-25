function Meteor(src, x, y, dy, width, height, timer = new Date()) {
  this.img = new Image()
  this.img.src = src
  this.x = x
  this.y = y
  this.timer = timer
  this.dy = dy
  this.width = width
  this.height = height

  this.draw = () => {
    window.c.drawImage(this.img, this.x, this.y, this.width, this.height)
  }

  this.update = () => {
    if (this.y > innerHeight + this.height) {
      this.x = Math.random() * innerWidth
      this.y = -this.height
    } else {
      this.y += this.dy
    }

    this.draw()
  }
}

export default Meteor