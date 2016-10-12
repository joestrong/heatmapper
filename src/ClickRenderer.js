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
    const docSize = document.querySelector('html').getBoundingClientRect()
    this.canvas = document.createElement('canvas')
    this.canvas.width = Math.round(docSize.width)
    this.canvas.height = Math.round(docSize.height)
    this.canvas.style.position = 'absolute'
    this.canvas.style.top = '0'
    this.canvas.style.left = '0'
    this.canvas.style.zIndex = '99999'
    this.canvas.style.pointerEvents = 'none'
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
    const context = this.canvas.getContext('2d')
    const size = 5
    context.beginPath()
    context.arc(x, y, size, 0, 2 * Math.PI, false)
    context.fillStyle = '#000'
    context.fill()
  }

  clearClicks() {
    const context = this.canvas.getContext('2d')
    context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  drawClicks() {
    this.clicks.map((click, index) => {
      this.drawClick(click)
    })
  }

  onWindowSize(event) {
    clearTimeout(this.resizeTimeout)
    this.resizeTimeout = setTimeout(() => {
      const docSize = document.querySelector('html').getBoundingClientRect()
      this.canvas.width = Math.round(docSize.width)
      this.canvas.height = Math.round(docSize.height)
      requestAnimationFrame(() => {
        this.redrawClicks()
      })
    }, 200)
  }

  redrawClicks() {
    this.clearClicks()
    this.drawClicks()
  }
}
