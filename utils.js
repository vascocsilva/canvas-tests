import Circle from './circle'
import Meteor from './meteor'

export function addCircle(canvas, map, key, randomY = true) {
  const radius = Math.random() * 3
  const x = Math.random() * (innerWidth - radius * 2) + radius
  const y = randomY ?
    Math.random() * (innerHeight - radius * 2) + radius :
    0
  const dx = 0
  const dy = 5
  const alpha = Math.random()
  map.set(key, new Circle(map, addCircle, x, y, dx, dy, radius, key, alpha))
}

export function addMeteor(meteors, key) {
  const meteor = new Meteor(
    'meteor.png',
    Math.random() * innerWidth,
    0,
    Math.floor(Math.random() * 10) + 5,
    25,
    50,
    (new Date()).getTime() + Math.random() * 3000
  )

  meteors.set(key, meteor)
}

export function destroyMeteor(meteors, key) {
  meteors.delete(key)
  addMeteor(meteors, _.uniqueId())
}