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
    const rotate = true//this.y === 0

    // if (rotate) {
      console.log('entrei');

      window.c.save()
      window.c.translate(this.x, this.y)
      window.c.rotate(Math.random() * 360)
      window.c.translate(-this.x, -this.y)
    // }

    window.c.drawImage(this.img, rotate ? 0 : this.x, rotate ? 0 : this.y, this.width, this.height)

    window.c.restore()
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