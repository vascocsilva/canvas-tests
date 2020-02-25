function Points(points, start) {
  this.points = 0
  this.start = start

  this.draw = () => {
    const nowTime = new Date().getTime()
    this.points += Math.floor((nowTime - this.start) / 1000)

    const text = this.points
    c.fillStyle = 'white'
    c.font = '20px sans-serif';
    const textM = c.measureText(text)
    c.fillText(text, 20, 20)
  }
}

export default Points