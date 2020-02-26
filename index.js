import Spaceship from './spaceship'
import Life from './life'
import Points from './points'
import Explosion from './explosion'
import TextMiddle from './textmiddle'
import { addCircle, addMeteor, destroyMeteor, addMoreMeteors } from './utils'

const canvas = document.querySelector('#canvas')
window.c = canvas.getContext('2d')
window.life = 100
const spaceshipWidth = 90
const spaceshipHeight = 90
const spaceshipDx = 15
const life = new Life()
const explosion = new Explosion(50, 50)

let spaceship = null
let circles = null
let explosions = null
let meteors = null
let startTime = null
let timer = null
let points = null

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

  if (
    e.key === 'Enter'
    && window.life <= 0
  ) {
    window.life = 100
    init()
    animate()
  }

  if (
    e.key === 'l'
    && window.life > 0
  ) {
    window.life = 0
  }
})

window.addEventListener('keyup', (e) => {
  spaceship.changeState(null)
})

function animate() {
  if (window.life > 0) {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, innerWidth, innerHeight)

    for (let [key, circle] of circles) {
      circle.update()
    }

    if (new Date() - startTime > 5000) {
      if (points.updatedLevel) {
        addMoreMeteors(meteors, points.level * 2)
        console.log(meteors.size, points.level)
      }

      let now = (new Date()).getTime()
      for (let [key, meteor] of meteors) {
        if (meteor.timer < now) {
          meteor.update()

          if (
            (
              meteor.y >= innerHeight - spaceship.height
              && meteor.y <= innerHeight
            )
            && (
              meteor.x > spaceship.x - spaceship.width / 2
              && meteor.x < spaceship.x + spaceship.width
            )
          ) {
            const explosionId = _.uniqueId()
            explosions.set(explosionId, new Explosion(meteor.x, meteor.y, explosionId, explosions))
            life.hit()
            destroyMeteor(meteors, key)
          }
        }
      }
    }

    spaceship.draw()
    life.draw()
    points.draw()

    for (let [key, explosion] of explosions) {
      explosion.draw()
    }
  } else {
    const text = `GAME OVER`
    const hint = '(press enter to retry)'
    c.fillStyle = 'rgba(0, 0, 0, 0.6)'
    c.fillRect(0, 0, innerWidth, innerHeight)
    TextMiddle('GAME OVER', { y: (innerHeight / 2) - 60 })
    TextMiddle(`Points: ${points.points} | Level: ${points.level}`, { y: (innerHeight / 2) - 20, fontSize: 20, color: 'red' })
    c.fillStyle = 'red'
    c.font = '20px sans-serif'
    const textH = c.measureText(hint)
    c.fillText(hint, innerWidth / 2 - textH.width / 2, (innerHeight / 2) + 40)
  }
}

function init() {
  startTime = new Date()
  circles = new Map()
  meteors = new Map()
  points = new Points(0, startTime.getTime())
  explosions = new Map()

  for (let i = 0; i < 500; i++) {
    addCircle(c, circles, i)
  }

  for (let i = 0; i < innerWidth / 100; i++) {
    addMeteor(meteors, i)
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
}

init()
animate()