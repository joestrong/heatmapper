"use strict"
import ClickTracker from '../src/ClickTracker.js'

describe('ClickTracker', () => {

  let body = null
  let clickTracker = null

  beforeEach(() => {
    body = document.querySelector('body')
    const div = document.createElement('div')
    const span = document.createElement('span')
    body.appendChild(div)
    body.appendChild(span)
    clickTracker = new ClickTracker()
  })

  it('should be instanciated', () => {
    expect(clickTracker).toEqual(jasmine.any(ClickTracker))
  })

  it('should have a click handler for the document', () => {
    spyOn(clickTracker, 'placeClick')
    body.click()
    expect(clickTracker.placeClick).toHaveBeenCalled()
  })

  it('should log a click each time a click is placed in the document', () => {
    expect(clickTracker.clicks.length).toEqual(0)
    body.click()
    expect(clickTracker.clicks.length).toEqual(1)
    body.click()
    expect(clickTracker.clicks.length).toEqual(2)
  })

  it('should log a click for block elements', () => {
    body.querySelector('div').click()
    expect(clickTracker.clicks.length).toEqual(1)
  })

  it('should log a click for inline elements', () => {
    body.querySelector('span').click()
    expect(clickTracker.clicks.length).toEqual(1)
  })

  it('should take a callback that is called after placing a click', () => {
    spyOn(clickTracker, 'clickPlaced')
    body.click()
    expect(clickTracker.clickPlaced).toHaveBeenCalled()
  })
})
