function Explosion(x, y, id, explosions) {
  this.src = 'explosion.png'
  this.x = x
  this.y = y
  this.srcX = 0
  this.srcY = 0
  this.sheetWidth = 512
  this.sheetHeight = 256
  this.frameCount = 24
  this.cols = 8
  this.rows = 3
  this.width = this.sheetWidth / this.cols
  this.height = this.sheetHeight / this.rows - 20
  this.currentFrame = 0
  this.image = new Image()
  this.image.src = this.src

  this.update = () => {
    this.currentFrame = ++this.currentFrame % this.cols
    this.srcX = this.currentFrame * this.width
  }

  this.draw = () => {
    this.update()
    if (this.currentFrame < 7) {
      window.c.drawImage(
        this.image,
        this.srcX,
        this.srcY,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height,
      )
    } else {
      explosions.delete(id)
    }
  }
}

export default Explosion