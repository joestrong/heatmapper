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
    let meta = {
      path: cssPath(event.target),
      x: event.offsetX,
      y: event.offsetY
    }
    this.clicks.push(meta)
  }
}

new Heatmapper()
