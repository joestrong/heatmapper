"use strict"
const cssPath = require('css-path')

export default class ClickTracker {

  constructor() {
    this.clicks = []
    this.clickPlaced = null // Callback event
    this.bindEvents()
  }

  bindEvents() {
    document.addEventListener('click', (event) => this.placeClick(event))
    // Override stopPropagation
    const oldStopPropagation = Event.prototype.stopPropagation
    const clickTracker = this
    Event.prototype.stopPropagation = function() {
      clickTracker.placeClick(this)
      oldStopPropagation.call(this)
    }
  }

  placeClick(event) {
    const element = event.target
    const dimensions = element.getBoundingClientRect()
    const click = {
      path: cssPath(element),
      position: {
        pixelX: event.offsetX,
        pixelY: event.offsetY,
        x: Math.round(event.offsetX / dimensions.width * 100) / 100,
        y: Math.round(event.offsetY / dimensions.height * 100) / 100
      }
    }
    this.clicks.push(click)
    if (this.clickPlaced) {
      this.clickPlaced(click);
    }
  }
}
