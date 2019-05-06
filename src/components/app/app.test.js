/* eslint-disable no-undef */
import React from 'react'
import ReactDOM from 'react-dom'
import Renderer from 'react-test-renderer'
import App from './app.js'

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  test('has a valid snapshot', () => {
    const component = Renderer.create(<App /> )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

