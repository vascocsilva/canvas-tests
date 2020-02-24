const canvas = document.querySelector('#canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const c = canvas.getContext('2d')

const mouse = {
  x: null,
  y: null,
}

const colorArray = [
  '#d6fff6',
  '#231651',
  '#4dccbd',
  '#2374ab',
  '#ff1100',
]

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x
  mouse.y = e.y
})

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  init()
})

const maxRadius = 60
const minRadius = 10

function Circle(x, y, dx, dy, radius) {
  this.x = x
  this.y = y
  this.dx = dx
  this.dy = dy
  this.radius = radius
  this.originalRadius = radius
  this.fillColor = colorArray[Math.floor(Math.random() * colorArray.length)]

  this.draw = () => {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.fillColor
    c.fill()
  }

  this.update = () => {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy
    }

    this.x += this.dx
    this.y += this.dy

    if (
      mouse.x - this.x < 50
      && mouse.x - this.x > -50
      && mouse.y - this.y < 50
      && mouse.y - this.y > -50
      && this.radius < maxRadius
    ) {
      this.radius += 1
    } else if (this.radius > this.originalRadius) {
      this.radius -= 1
    }

    this.draw()
  }
}

let circleArray = []

function init() {
  circleArray = []
  for (let i = 0; i < 500; i++) {
    const radius = Math.random() * minRadius + 1
    const x = Math.random() * (innerWidth - radius * 2) + radius
    const y = Math.random() * (innerHeight - radius * 2) + radius
    const dx = (Math.random() - 0.5) * 4
    const dy = (Math.random() - 0.5) * 4

    circleArray.push(new Circle(x, y, dx, dy, radius))
  }
}

function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, innerWidth, innerHeight)

  circleArray.forEach(circle => {
    circle.update()
  });

}

init()
animate()