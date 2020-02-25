import Circle from './circle'

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