import React, { Component } from 'react'
import { Button } from '../button/button'
import PropTypes from 'prop-types'

// Stateless functional component
// It does not need access to state or lifecycle methods
class Search extends Component {
  constructor() {
    super()

    this.input = React.createRef()
  }

  componentDidMount() {
    if(this.input && this.input.current) {
      this.input.current.focus()
    }
  }

  render() {
    const {
      value,
      onChange,
      onSubmit,
      children
    } = this.props

    Search.propTypes = {
      value: PropTypes.string,
      onChange: PropTypes.func,
      onSubmit: PropTypes.func,
      children: PropTypes.node.isRequired,
    }

    return (
      <form onSubmit={onSubmit}>
        {children}
        <input
          type='text'
          value={value}
          onChange={onChange}
          ref={this.input}
        />
        <Button
          className='button'
          type='submit'>
          {children}
        </Button>
      </form>
    )
  }
}
export default Search
