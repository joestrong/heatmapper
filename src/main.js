"use strict"
const cssPath = require('css-path')

class Heatmapper {

  constructor() {
    this.clicks = [];
    this.bindEvents()
  }

  bindEvents() {
    document.addEventListener('click', this.placeClick.bind(this))
  }

  placeClick(event) {
    let click = {
      path: cssPath(event.target),
      position: {
        pixelX: event.offsetX,
        pixelY: event.offsetY,
        x: Math.round(event.offsetX / event.target.clientWidth * 100, 2),
        y: Math.round(event.offsetY / event.target.clientHeight * 100, 2)
      }
    }
    this.clicks.push(click)
  }
}

new Heatmapper()
