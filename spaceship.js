function Spaceship(src, x, y, width, height) {
  this.img = new Image()
  this.img.src = src
  this.x = x
  this.y = y
  this.width = width
  this.height = height

  this.draw = () => {
    window.c.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
}

export default Spaceship