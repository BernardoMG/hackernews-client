import React from 'react'
import { Button } from '../../button/button'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const Sort = ({ sortKey, onSort, children, activeSortKey }) => {
  const sortClass = classNames(
    'button-inline',
    { 'button-active': sortKey === activeSortKey }
  )

  Sort.propTypes = {
    sortKey: PropTypes.string,
    onSort: PropTypes.func,
    children: PropTypes.string,
    activeSortKey: PropTypes.string
  }

  return(
    <Button
      onClick={() => onSort(sortKey)}
      className={sortClass}
    >
      {children}
    </Button>
  )
}

export default Sort
