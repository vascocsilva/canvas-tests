function Spaceship(src, srcLeft, srcRight, x, y, width, height) {
  this.img = new Image()
  this.img.src = 'spaceship2.png'
  this.x = x
  this.y = y
  this.srcX = 0
  this.width = 72.2
  this.height = 72
  this.state = null
  this.sheetWidth = 288
  this.currentFrame = 0
  this.cols = this.sheetWidth / 72
  this.skew = 0
  this.xt = -20
  this.t = 0
  this.rate = 0

  this.update = () => {
    this.currentFrame = ++this.currentFrame % this.cols
    this.srcX = this.currentFrame * this.width
  }

  this.draw = () => {
    if (this.rate > 8) {
      this.update()
      this.rate = 0
    }

    window.c.drawImage(
      this.img,
      this.srcX,
      0,
      this.width,
      this.height,
      this.x - this.t,
      this.y,
      this.width + this.skew,
      this.height
    )
    this.rate += 1
  }


  this.changeState = (state) => {
    switch (state) {
      case 'left':
        this.skew = this.xt
        this.t = this.xt
        break
      case 'right':
        this.skew = this.xt
        break
      default:
        this.skew = 0
        this.t = 0
    }
    this.state = state
  }
}

export default Spaceship