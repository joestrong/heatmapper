"use strict"
import ClickRenderer from '../src/ClickRenderer.js'

describe('ClickRenderer', () => {

  let clickRenderer = null

  beforeEach(() => {
    clickRenderer = new ClickRenderer()
  })

  it('should be instanciated', () => {
    expect(clickRenderer).toEqual(jasmine.any(ClickRenderer))
  })
})
