function Circle(
  circles,
  addCircle,
  x,
  y,
  dx,
  dy,
  radius,
  key,
  alpha = 1
) {
  this.x = x
  this.y = y
  this.dx = dx
  this.dy = dy
  this.radius = radius
  this.alpha = alpha
  this.key = key

  this.draw = () => {
    window.c.beginPath()
    window.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    window.c.fillStyle = `rgba(255, 255, 255, ${this.alpha})`
    window.c.fill()
  }

  this.update = () => {
    if (this.x > innerWidth || this.x + this.radius < 0) {
      circles.delete(this.key)
      addCircle(c, circles, _.uniqueId(), false)
    }

    if (this.y > innerHeight || this.y + this.radius < 0) {
      circles.delete(this.key)
      addCircle(c, circles, _.uniqueId(), false)
    }

    this.x += this.dx
    this.y += this.dy
    this.alpha = Math.random()

    this.draw()
  }
}

export default Circle