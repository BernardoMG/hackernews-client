/* eslint-disable no-undef */
import React from 'react'
import ReactDOM from 'react-dom'
import Renderer from 'react-test-renderer'
import Search from './search.js'

describe('Search', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Search>Search</Search>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  test('has a valid snapshot', () => {
    const component = Renderer.create(<Search>Search</Search>)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

