/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import Axios from 'axios'
import './app.css'
import Search from '../search/search'
import Table from '../table/table.js'
import { ButtonWithLoading } from '../button/button'

const DEFAULT_QUERY = 'redux'
const DEFAULT_HPP = '10'
const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='
const PARAM_PAGE = 'page='
const PARAM_HPP = 'hitsPerPage='
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}`

// higher-order function
const updateSearchTopStoriesState = (hits, page) => (prevState) => {
  const { searchKey, results } = prevState

  const oldHits = results && results[searchKey]
    ? results[searchKey].hits
    : []

  const updatedHits = [
    ...oldHits,
    ...hits
  ]

  return {
    results: {
      ...results,
      [searchKey]: { hits: updatedHits, page }
    },
    isLoading: false
  }
}

class App extends Component {
  _isMounted = false

  constructor (props) {
    super(props)

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false
    }

    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this)
    this.setSearchTopStories = this.setSearchTopStories.bind(this)
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
    this.onSearchChanged = this.onSearchChanged.bind(this)
  }

  onSort(sortKey) {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse
    this.setState({ sortKey, isSortReverse })
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm]
  }

  setSearchTopStories(result) {
    const { hits, page } = result
    this.setState(updateSearchTopStoriesState(hits, page))
  }    

  fetchSearchTopStories(searchTerm, page = 0) {
    this.setState({ isLoading: true })

    Axios(`${url}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(result => this._isMounted && this.setSearchTopStories(result.data))
      .catch(error => this._isMounted && this.setState({ error }))
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state

    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm)
    }

    event.preventDefault()
  }

  onDismiss (objectID) {
    const { searchKey, results } = this.state
    const { hits, page } = results[searchKey]

    const updatedList = hits.filter(item => item.objectID !== objectID)

    // object spread operator
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedList, page }
      }
    })
  }

  onSearchChanged (event) {
    this.setState({ searchTerm: event.target.value })
  }

  // lifecycle method
  componentDidMount() {
    this._isMounted = true
    const { searchTerm } = this.state
    this.setState({ searchKey: searchTerm })
    this.fetchSearchTopStories(searchTerm)
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render () {
    const {
      searchTerm,
      results,
      searchKey,
      error,
      isLoading
    } = this.state
    
    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
    ) || 0

    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || []

    return (
      <div className='page'>
        <div className='interactions'>
          <Search
            value={searchTerm}
            onChange={this.onSearchChanged}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        { error
          ? <div className='interactions'>
            <p>Something went wrong.</p>
          </div>         
          : <Table
            list={list}
            onDismiss={this.onDismiss}
          />
        }
        <div className='interactions'>
          <ButtonWithLoading
            onClick={()=> this.fetchSearchTopStories(searchKey, page + 1)}
            className='button'
            type='button'
            isLoading={isLoading}
          >
            <span>More</span>
          </ButtonWithLoading>
        </div>
      </div>
    )
  }
}

export default App
