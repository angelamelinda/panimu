import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class FilterTools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listYearOpen: false,
      listBrandOpen: false,
      listBrand: [],
      listYear: []
    }
    this.toggleYearList = this.toggleYearList.bind(this);
    this.toggleBrandList = this.toggleBrandList.bind(this);
    this.extractYearBrand = this.extractYearBrand.bind(this);
  }
  componentWillMount() {
    this.extractYearBrand();
  }
  extractYearBrand() {
    let year = [], brand = [];
    Object.keys(this.props.catalog.phones).map((key, id) => {
      year.push(this.props.catalog.phones[key].release_year);
      brand.push(this.props.catalog.phones[key].brand);
    })

    year = Array.from(new Set(year)).sort().reverse();
    brand = Array.from(new Set(brand)).sort();

    this.setState({
      listYear: year,
      listBrand: brand
    })
  }
  toggleYearList() {
    this.setState(prevState => ({
     listYearOpen: !prevState.listYearOpen
   }))
  }
  toggleBrandList() {
    this.setState(prevState => ({
     listBrandOpen: !prevState.listBrandOpen
   }))
  }
  render() {
    return (
      <div className="row mt-2 justify-content-end no-gutters">
        <div className="col-sm-6 col-6 pr-1">
          <div className="filter-year filter position-relative">
            <div className={"color-white background-tosca d-flex align-items-center justify-content-between transition-ease " + (!this.state.listYearOpen ? 'rounded-25 pl-3 pr-3' : 'pl-2 pr-2')} onClick={this.toggleYearList}>
              <div className="text-left">
                <small className="d-block">Years</small>
                <small className="d-block">{this.props.isFiltered.year ? 'Filtered...' : 'All Years'}</small>
              </div>
              <div className="d-block">{this.state.listYearOpen? <FontAwesomeIcon icon="chevron-up" /> : <FontAwesomeIcon icon="chevron-down" />}</div>
            </div>
            <ul className={"list-unstyled mb-0 position-absolute w-100 background-tosca color-white text-left pl-2 pr-2 mt-1 transition-ease " + (this.state.listYearOpen ? 'max-h-80 overflow-auto pt-2 pb-2' : 'max-h-0 overflow-hidden pt-0 pb-0')}>
              {
                this.state.listYear.map((item, id) => (
                  <li key={id}><label className="mb-0" htmlFor={"year-"+item}><input id={"year-"+item} value={item} type="checkbox" name="filter-year" onChange={this.props.handleSearchFilter}/> <small>{item}</small></label></li>
                ))
              }
            </ul>
          </div>
        </div>
        <div className="col-sm-6 col-6 pl-1">
          <div className="filter-brand filter position-relative">
            <div className={"color-white background-tosca d-flex align-items-center justify-content-between transition-ease " + (!this.state.listBrandOpen ? 'rounded-25 pl-3 pr-3' : 'pl-2 pr-2')} onClick={this.toggleBrandList}>
              <div className="text-left">
                <small className="d-block">Brands</small>
                <small className="d-block">{this.props.isFiltered.brand ? 'Filtered...' : 'All brand'}</small>
              </div>
              <div className="d-block">{this.state.listBrandOpen? <FontAwesomeIcon icon="chevron-up" /> : <FontAwesomeIcon icon="chevron-down" />}</div>
            </div>
            <ul className={"list-unstyled mb-0 position-absolute w-100 background-tosca color-white text-left pl-2 pr-2 mt-1 transition-ease " + (this.state.listBrandOpen ? 'max-h-80 overflow-auto pt-2 pb-2' : 'max-h-0 overflow-hidden pt-0 pb-0')}>
              {
                this.state.listBrand.map((item, id) => (
                  <li key={id}><label className="mb-0" htmlFor={"brand-"+item}><input id={"brand-"+item} value={item} type="checkbox" name="filter-brand" onChange={this.props.handleSearchFilter}/> <small>{item}</small></label></li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default FilterTools;
