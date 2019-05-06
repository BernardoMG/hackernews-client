/* eslint-disable react/display-name */
import React from 'react'
import PropTypes from 'prop-types'
import Loading from '../loading/loading'

const Button = ({ onClick, className, type, children }) =>
  <button
    onClick={onClick}
    className={className}
    type={type}
  >
    {children}
  </button>
  

const withLoading = (Component) => ({ isLoading, ...rest }) =>
  isLoading
    ? <Loading />
    : <Component { ...rest } />

const ButtonWithLoading = withLoading(Button)

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node.isRequired
}

Button.defaultProps = {
  onClick: null,
  className: ''
}

export { Button, ButtonWithLoading }
