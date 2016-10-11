"use strict"
import ClickRenderer from '../src/ClickRenderer.js'

describe('ClickRenderer', () => {

  let clickRenderer = null
  let click = null

  beforeEach(() => {
    clickRenderer = new ClickRenderer()
    click = {
      path: 'body',
      position: {
        pixelX: 0,
        pixelY: 0,
        x: 0,
        y: 0
      }
    }
  })

  afterEach(() => {
    clickRenderer = null
    click = null
    document.querySelector('body').innerHTML = ''
  })

  it('should be instanciated', () => {
    expect(clickRenderer).toEqual(jasmine.any(ClickRenderer))
  })

  it('should instanciate a canvas element', () => {
    const canvas = document.querySelectorAll('div.heatmapper-canvas')
    expect(canvas.length).toEqual(1)
  })

  it('should register a window resize event', () => {
    spyOn(clickRenderer, 'onWindowSize')
    window.dispatchEvent(new Event('resize'))
    expect(clickRenderer.onWindowSize).toHaveBeenCalled()
  })

  it('should take a click and draw a spot', () => {
    spyOn(clickRenderer, 'drawSpot')
    clickRenderer.drawClick(click)
    expect(clickRenderer.drawSpot).toHaveBeenCalled()
  })

  it('should draw a spot and add an element to the canvas', () => {
    const canvas = document.querySelector('div.heatmapper-canvas')
    expect(canvas.childNodes.length).toEqual(0)
    clickRenderer.drawSpot(0, 0)
    expect(canvas.childNodes.length).toEqual(1)
  })

  it('should take a click and add an element to the canvas', () => {
    const canvas = document.querySelector('div.heatmapper-canvas')
    expect(canvas.childNodes.length).toEqual(0)
    clickRenderer.drawClick(click)
    expect(canvas.childNodes.length).toEqual(1)
  })

  it('should be able to clear the canvas', () => {
    const canvas = document.querySelector('div.heatmapper-canvas')
    clickRenderer.drawClick(click)
    clickRenderer.drawClick(click)
    expect(canvas.childNodes.length).toEqual(2)
    clickRenderer.clearClicks()
    expect(canvas.childNodes.length).toEqual(0)
  })

  it('should be able to clear clicks, then draw all clicks again', () => {
    const canvas = document.querySelector('div.heatmapper-canvas')
    clickRenderer.drawClick(click)
    clickRenderer.drawClick(click)
    expect(canvas.childNodes.length).toEqual(2)
    clickRenderer.clearClicks()
    expect(canvas.childNodes.length).toEqual(0)
    clickRenderer.drawClicks()
    expect(canvas.childNodes.length).toEqual(2)
  })

  it('should be able to redraw clicks', () => {
    spyOn(clickRenderer, 'clearClicks').and.callThrough()
    const canvas = document.querySelector('div.heatmapper-canvas')
    clickRenderer.drawClick(click)
    clickRenderer.drawClick(click)
    expect(canvas.childNodes.length).toEqual(2)
    clickRenderer.redrawClicks()
    expect(clickRenderer.clearClicks).toHaveBeenCalled()
    expect(canvas.childNodes.length).toEqual(2)
  })
})
