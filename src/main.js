"use strict"
import ClickTracker from './ClickTracker.js'
import ClickRenderer from './ClickRenderer.js'

class Heatmapper {

  constructor() {
    this.clickTracker = new ClickTracker()
    this.clickRenderer = new ClickRenderer()
    this.clickTracker.clickPlaced = click => {
      this.clickRenderer.clicks.push(click)
      this.clickRenderer.drawClick(click)
    }
  }
}

new Heatmapper()
