"use strict"
import ClickTracker from '../src/ClickTracker.js'

describe('ClickTracker', () => {

  let clickTracker = null

  beforeEach(() => {
    const div = document.createElement('div')
    document.querySelector('body').appendChild(div)
    clickTracker = new ClickTracker()
  })

  it('should be instanciated', () => {
    expect(clickTracker).toEqual(jasmine.any(ClickTracker))
  })
})
