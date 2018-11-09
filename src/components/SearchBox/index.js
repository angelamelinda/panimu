import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSearchFilter();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="background-white rounded-25">
        <input type="text" placeholder="Search Phone" className="pl-3 pr-3 border-0" onChange={this.props.handleSearchFilter} ref={this.props.inputRef}/>
        <label className="search mb-0 pl-3 pr-3 text-right">
          {
            this.props.isSearched ? <span onClick={this.props.handleClear} className="text-right cursor-pointer"><FontAwesomeIcon icon="times"/> </span> : <span className="color-tosca cursor-pointer"><FontAwesomeIcon icon="search" /></span>
          }

        </label>
      </form>
    )
  }
}

export default SearchBox;
