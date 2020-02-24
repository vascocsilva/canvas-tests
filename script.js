const canvas = document.querySelector('#canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const c = canvas.getContext('2d')

function addCircle(key, randomY = true) {
  const radius = Math.random() * 3
  const x = Math.random() * (innerWidth - radius * 2) + radius
  const y = randomY
    ? Math.random() * (innerHeight - radius * 2) + radius
    : 0
  const dx = 0//(Math.random() - 0.5) * 4
  const dy = 1//(Math.random() - 0.5) * 4
  const alpha = Math.random()
  circles.set(key, new Circle(x, y, dx, dy, radius, alpha, key))
}

function Circle(x, y, dx, dy, radius, alpha = 1, key) {
  this.x = x
  this.y = y
  this.dx = dx
  this.dy = dy
  this.radius = radius
  this.alpha = alpha
  this.key = key

  this.draw = () => {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = `rgba(255, 255, 255, ${this.alpha})`
    c.fill()
  }

  this.update = () => {
    if (this.x > innerWidth || this.x + this.radius < 0) {
      circles.delete(this.key)
      addCircle(_.uniqueId(), false)
    }

    if (this.y > innerHeight || this.y + this.radius < 0) {
      circles.delete(this.key)
      addCircle(_.uniqueId(), false)
    }

    this.x += this.dx
    this.y += this.dy
    this.alpha = Math.random()

    this.draw()
  }
}

let circle = new Circle(200, 200, 4, 4, 30, 0.6)


const radius = 30

const circles = new Map()
for (let i = 0; i < 500; i++) {
  addCircle(i)
}

console.log(circles);


function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, innerWidth, innerHeight)

  for (let [key, value] of circles) {
    value.update()
  }
}

animate()