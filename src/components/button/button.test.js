/* eslint-disable no-undef */
import React from 'react'
import ReactDOM from 'react-dom'
import Renderer from 'react-test-renderer'
import { Button } from './button.js'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Button', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Button>More</Button>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  test('has a valid snapshot', () => {
    const component = Renderer.create(<Button>More</Button>)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('shows a standard button', () => {
    const element = shallow(
      <Button
        className='button'
        type='button'
      >
        <span>More</span> 
      </Button>
    ).getElement(0)

    expect(element.props.children.type).toBe('span')
    expect(element.props.children.props.children).toBe('More')
    expect(element.props.className).toBe('button')
    expect(element.props.type).toBe('button')
  })
})

