function TextMiddle(text, options = null) {
  let fontSize = 50
  let color = 'white'
  let y = 0

  if (options) {
    fontSize = options.fontSize || fontSize
    color = options.color || color
    y = options.y || y
  }

  window.c.fillStyle = color
  window.c.font = `${fontSize}px sans-serif`
  const textM = window.c.measureText(text)
  window.c.fillText(text, innerWidth / 2 - textM.width / 2, y)
}

export default TextMiddle