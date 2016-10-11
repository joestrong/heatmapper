"use strict"

export default class ClickRenderer {

  constructor() {
    this.clicks = []
    this.initCanvas()
    this.bindEvents()
  }

  bindEvents() {
    window.addEventListener('resize', (event) => this.onWindowSize(event))
  }

  initCanvas() {
    this.canvas = document.createElement('div')
    this.canvas.style.position = 'absolute'
    this.canvas.style.top = '0'
    this.canvas.style.left = '0'
    this.canvas.style.zIndex = '99999'
    this.canvas.classList.add('heatmapper-canvas')
    document.querySelector('body').appendChild(this.canvas)
  }

  drawClick(click) {
    this.clicks.push(click)
    const element = document.querySelector(click.path)
    const bodyRect = document.querySelector('body').getBoundingClientRect()
    const rect = element.getBoundingClientRect()
    const position = { left: rect.left - bodyRect.left, top: rect.top - bodyRect.top }
    const left = position.left + (click.position.x * rect.width)
    const top = position.top + (click.position.y * rect.height)
    this.drawSpot(left, top)
  }

  drawSpot(x, y) {
    const spot = document.createElement('div')
    spot.style.width = '10px'
    spot.style.height = '10px'
    spot.style.borderRadius = '50%'
    spot.style.backgroundColor = 'black'
    spot.style.position = 'absolute'
    spot.style.left = (x - 5) + 'px'
    spot.style.top = (y - 5) + 'px'
    this.canvas.appendChild(spot)
  }

  clearClicks() {
    this.canvas.innerHTML = ''
  }

  drawClicks() {
    this.clicks.map((click, index) => {
      this.drawClick(click)
    })
  }

  onWindowSize(event) {
    clearTimeout(this.resizeTimeout)
    this.resizeTimeout = setTimeout(() => {
      this.redrawClicks();
    }, 200)
  }

  redrawClicks() {
    this.clearClicks()
    this.drawClicks()
  }
}
