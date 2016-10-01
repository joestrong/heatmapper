"use strict"
const cssPath = require('css-path')

class Heatmapper {

  constructor() {
    this.clicks = [];
    this.canvas = document.createElement('div')
    document.querySelector('body').appendChild(this.canvas)
    this.bindEvents()
  }

  bindEvents() {
    document.addEventListener('click', this.placeClick.bind(this))
  }

  placeClick(event) {
    const click = {
      path: cssPath(event.target),
      position: {
        pixelX: event.offsetX,
        pixelY: event.offsetY,
        x: Math.round(event.offsetX / event.target.clientWidth * 100, 2),
        y: Math.round(event.offsetY / event.target.clientHeight * 100, 2)
      }
    }
    this.clicks.push(click)
    this.showClick(click)
  }

  showClick(click) {
    const element = document.querySelector(click.path)
    const left = element.offsetLeft + click.position.pixelX
    const top = element.offsetTop + click.position.pixelY
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
}

new Heatmapper()
