const canvas = document.querySelector('#canvas')
const c = canvas.getContext('2d')
const spaceshipWidth = 90
const spaceshipHeight = 90
const spaceshipDx = 15

let spaceship = null
let circles = new Map()

canvas.width = window.innerWidth
canvas.height = window.innerHeight

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  init()
})

function addCircle(map, key, randomY = true) {
  const radius = Math.random() * 3
  const x = Math.random() * (innerWidth - radius * 2) + radius
  const y = randomY
    ? Math.random() * (innerHeight - radius * 2) + radius
    : 0
  const dx = 0
  const dy = 5
  const alpha = Math.random()
  map.set(key, new Circle(x, y, dx, dy, radius, alpha, key))
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
      addCircle(circles, _.uniqueId(), false)
    }

    if (this.y > innerHeight || this.y + this.radius < 0) {
      circles.delete(this.key)
      addCircle(circles, _.uniqueId(), false)
    }

    this.x += this.dx
    this.y += this.dy
    this.alpha = Math.random()

    this.draw()
  }
}

function Spaceship(src, x, y, width, height) {
  this.img = new Image()
  this.img.src = src
  this.x = x
  this.y = y
  this.width = width
  this.height = height

  this.draw = () => {
    c.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
}

window.addEventListener('keydown', (e) => {
  if (
    e.key === 'ArrowLeft'
    && spaceship.x > -spaceshipDx
  ) {
    spaceship.x -= spaceshipDx
  }

  if (
    e.key === 'ArrowRight'
    && spaceship.x < innerWidth - spaceshipWidth + spaceshipDx
  ) {
    spaceship.x += spaceshipDx
  }
})

function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, innerWidth, innerHeight)

  for (let [key, value] of circles) {
    value.update()
  }

  spaceship.draw()
}

function init() {
  circles = new Map()

  for (let i = 0; i < 500; i++) {
    addCircle(circles, i)
  }

  spaceship = new Spaceship(
    'spaceship.png',
    innerWidth / 2 - 45,
    innerHeight - 120,
    spaceshipWidth,
    spaceshipHeight
  )

  spaceship.draw()
}

init()
animate()