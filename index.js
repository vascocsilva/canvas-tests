import Spaceship from './spaceship'
import Circle from './circle'
import { addCircle } from './utils'

const canvas = document.querySelector('#canvas')
window.c = canvas.getContext('2d')
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

window.addEventListener('keydown', (e) => {
  if (
    e.key === 'ArrowLeft'
    && spaceship.x > -spaceshipDx
  ) {
    spaceship.changeState('left')
    spaceship.x -= spaceshipDx
  }

  if (
    e.key === 'ArrowRight'
    && spaceship.x < innerWidth - spaceshipWidth + spaceshipDx
  ) {
    spaceship.changeState('right')
    spaceship.x += spaceshipDx
  }
})

window.addEventListener('keyup', (e) => {
  spaceship.changeState(null)
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
    addCircle(c, circles, i)
  }

  spaceship = new Spaceship(
    'spaceship.png',
    'spaceship-left.png',
    'spaceship-right.png',
    innerWidth / 2 - 45,
    innerHeight - 120,
    spaceshipWidth,
    spaceshipHeight
  )

  spaceship.draw()
}

init()
animate()