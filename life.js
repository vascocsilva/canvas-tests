function Life() {
  this.hit = () => {
    window.life -= 10
  }

  this.draw = () => {
    window.c.fillStyle = 'green'
    window.c.fillRect(innerWidth - 40, 20, 20, 200);
    window.c.fillStyle = 'rgba(0, 0, 0, 0.5)'
    window.c.fillRect(innerWidth - 40, 20, 20, 200 - life * 2);
  }
}

export default Life