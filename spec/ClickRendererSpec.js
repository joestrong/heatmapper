"use strict"
import ClickRenderer from '../src/ClickRenderer.js'

describe('ClickRenderer', () => {

  let clickRenderer = null
  let click = null
  let fakeContext = null

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
    fakeContext = {
      beginPath: () => {},
      arc: () => {},
      fill: () => {},
      clearRect: () => {}
    }
  })

  afterEach(() => {
    clickRenderer = null
    click = null
    fakeContext = null
    document.querySelector('body').innerHTML = ''
  })

  it('should be instanciated', () => {
    expect(clickRenderer).toEqual(jasmine.any(ClickRenderer))
  })

  it('should instanciate a canvas element', () => {
    const canvas = document.querySelectorAll('canvas.heatmapper-canvas')
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

  it('should draw a spot and draw to the canvas element', () => {
    spyOn(fakeContext, 'fill')
    clickRenderer.canvas.getContext = () => fakeContext
    clickRenderer.drawSpot(0, 0)
    expect(fakeContext.fill).toHaveBeenCalled()
  })

  it('should take a click and add an element to the canvas', () => {
    spyOn(fakeContext, 'fill')
    clickRenderer.canvas.getContext = () => fakeContext
    clickRenderer.drawClick(click)
    expect(fakeContext.fill).toHaveBeenCalled()
  })

  it('should be able to clear the canvas', () => {
    spyOn(fakeContext, 'fill')
    spyOn(fakeContext, 'clearRect')
    clickRenderer.canvas.getContext = () => fakeContext
    clickRenderer.drawClick(click)
    expect(fakeContext.fill).toHaveBeenCalled()
    clickRenderer.clearClicks()
    expect(fakeContext.clearRect).toHaveBeenCalled()
  })

  it('should be able to clear clicks, then draw all clicks again', () => {
    spyOn(fakeContext, 'fill')
    spyOn(fakeContext, 'clearRect')
    clickRenderer.canvas.getContext = () => fakeContext
    // draw click
    clickRenderer.drawClick(click)
    expect(fakeContext.fill).toHaveBeenCalled()
    // clear click
    clickRenderer.clearClicks()
    expect(fakeContext.clearRect).toHaveBeenCalled()
    // redraw click
    clickRenderer.drawClicks()
    expect(fakeContext.fill.calls.count()).toEqual(2)
  })

  it('should be able to redraw clicks', () => {
    spyOn(fakeContext, 'fill')
    spyOn(fakeContext, 'clearRect')
    clickRenderer.canvas.getContext = () => fakeContext
    clickRenderer.drawClick(click)
    clickRenderer.redrawClicks()
    expect(fakeContext.clearRect).toHaveBeenCalled()
    expect(fakeContext.fill.calls.count()).toEqual(2)
  })
})
