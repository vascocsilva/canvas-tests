function Spaceship(src, srcLeft, srcRight, x, y, width, height) {
  this.img = new Image()
  this.img.src = src
  this.x = x
  this.y = y
  this.width = width
  this.height = height
  this.state = null

  this.draw = () => {
    window.c.drawImage(this.img, this.x, this.y, this.width, this.height)
  }

  this.changeState = (state) => {
    switch (state) {
      case 'left':
        this.img.src = srcLeft
        break
      case 'right':
        this.img.src = srcRight
        break
      default:
        this.img.src = src
    }
    this.state = state
  }
}

export default Spaceship