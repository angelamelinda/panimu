import React, { Component } from 'react';
import axios from 'axios';

import SearchBox from '../../components/SearchBox';
import FilterTools from '../../components/FilterTools';
import Listing from '../../components/Listing'
import Hero from '../../assets/img/hero.jpg';

class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseData : [],
      catalog : [],
      searchVal : '',
      isFiltered: { year:false, brand: false},
      isSearched: false,
      isSearchedExist: true,
      isFetched: false
    }
    this.fetchCatalog = this.fetchCatalog.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
    this.handleSearchFilter = this.handleSearchFilter.bind(this);
    this.getSelectedFilters = this.getSelectedFilters.bind(this);
    this.intersectArray = this.intersectArray.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }
  fetchCatalog() {
    return axios.get(`http://api.jsonbin.io/b/5b5b5041dc72f955bb79608a`).then((resp) => {
      console.log(resp);
      this.setState({
        baseData: resp.data,
        catalog: resp.data,
        isFetched: true
      })
    }).catch((error) => {
      console.log(error);
    })
  }
  handleClear(e) {
    e.preventDefault();
    this.inputElement.value = '';
    this.setState({
      isSearched: false
    })

    this.handleSearchFilter()
  }
  isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }
  intersectArray(a1, a2) {
    let result = []
    a1.map((item1) => {
      a2.map((item2) => {
        if(item1== item2) {
          result.push(item1);
        }
      })
    })
    return result;
  }
  getSelectedFilters(){
    let selectedFilter = Array.from(document.querySelectorAll(".filter input[type='checkbox']:checked")),
    selectedYearFilter = [],
    selectedBrandFilter = [];

    for (let i in selectedFilter) {
      let value = selectedFilter[i].getAttribute('value'),
          type = selectedFilter[i].getAttribute('name');
      if(type.indexOf('year') != -1) {
        selectedYearFilter.push(value)
      } else {
        selectedBrandFilter.push(value)
      }
    }

    return [selectedBrandFilter, selectedYearFilter];
  }
  handleSearchFilter() {
    let data = {};

      // Detect If filter is selected or Not
      let filterResult = this.getSelectedFilters();
      let selectedBrandFilter = filterResult[0],
          selectedYearFilter = filterResult[1];

      // Detect Searched or Not
      if(this.inputElement.value != '') {
        this.setState({
          isSearched: true
        })
      } else {
        this.setState({
          isSearched: false
        })
      }

      data = this.state.baseData;

      // Data from filter
      let combineFilterList= [], //temporary storage for filtered phones
          yearList = [],  //lists of selected year(s)
          brandList = []; //lists of selected brand(s)

      // first, filter trough all data according to acquired checked filter
      if (this.isEmpty(data.phones) == false) {
        Object.keys(data.phones).map((key, id) => {
          if(selectedBrandFilter.length > 0 ) {
            selectedBrandFilter.map(item => {
              if (item == data.phones[key].brand) {
                brandList.push(data.phones[key])
              }
            })
          }
          if(selectedYearFilter.length > 0 ) {
            selectedYearFilter.map(item => {
              if (item == data.phones[key].release_year) {
                yearList.push(data.phones[key])
              }
            })
          }
        })
      }

      let isBothFilterOn = brandList.length > 0 && yearList.length > 0 ;

      if (yearList.length == 0 &&  brandList.length == 0) {
        // when no filter is on
        this.setState({
          isFiltered: { year:false, brand: false},
        })

      } else if ( isBothFilterOn && yearList.length >= brandList.length) {
        // when both filter is on, search for bigger array to intersect filter results
        combineFilterList = this.intersectArray(yearList, brandList)
        this.setState({
          isFiltered: { year:true, brand: true},
        });

      } else if ( isBothFilterOn && brandList.length >= yearList.length ) {
        // when both filter is on, search for bigger array to intersect filter results
        combineFilterList = this.intersectArray(brandList, yearList)
        this.setState({
          isFiltered: { year:true, brand: true},
        });

      } else if (brandList.length > 0 ) {
        // when only brand filter is on
        combineFilterList = brandList;
        this.setState({
          isFiltered: { year:false, brand: true},
        });

      } else if (yearList.length > 0) {
        // when only year filter is on
        combineFilterList = yearList;
        this.setState({
          isFiltered: { year:true, brand: false},
        });

      }

      let searchList = [],
          allSearchList = [];

      if(this.inputElement.value != '') {
        if (this.isEmpty(data.phones) == false) {
          Object.keys(data.phones).map((key, id) => {
            if (data.phones[key].name.toLowerCase().indexOf(this.inputElement.value.toLowerCase()) != -1) {
              searchList.push(data.phones[key]);
            }
          });
        }
      }

      allSearchList.phones = searchList;

      let combineSearch = [],
          allCombineSearch = [];

      let isFilterAndSearchOn =  (brandList.length > 0 || yearList.length > 0) && this.inputElement.value != '';

      if ( isFilterAndSearchOn && combineFilterList.length >= searchList.length) {
        //when both filter is on search for bigger partition to intersect
        combineSearch = this.intersectArray(combineFilterList, searchList)
      } else if ( isFilterAndSearchOn && searchList.length >= combineFilterList.length) {
        //when both filter is on search for bigger partition to intersect
        combineSearch = this.intersectArray(searchList, combineFilterList)
      } else if (brandList.length == 0 && yearList.length == 0 && this.inputElement.value != '') {
        //when only search is on use only search result
        combineSearch = searchList;
      } else if (this.inputElement.value == '' && (brandList.length > 0 || yearList.length > 0)) {
        //when only filter is on use filtered result
        combineSearch = combineFilterList;
      }

      console.log(combineSearch,combineFilterList, searchList)
      if(brandList.length == 0 && yearList.length == 0 && this.inputElement.value == '') {
        this.setState({
          isSearchedExist: true,
          catalog: this.state.baseData
        })
      } else if(!this.isEmpty(combineSearch)){
        allCombineSearch.phones = combineSearch;
        this.setState({
          isSearchedExist: true,
          catalog: allCombineSearch
        })
      } else {
        this.setState({
          isSearchedExist: false
        })
      }
  }

  componentWillMount() {
    this.fetchCatalog();
  }
  render() {
    return (
      <div className="page">
        <div className="overlay overlay-black-75 pt-5 pb-5 background-center" style={{ backgroundImage: 'url('+Hero+')' }}>
          <div className="container">
            <div className="position-relative z-index-2 text-center w-100 max-w-600 aligncenter">
              <h2 className="color-white mb-4"><span className="font-yellowtail d-block transform-rotate-min-10 mb-1">Find</span><span className="font-weight-900 text-uppercase color-tosca">The Phone</span></h2>
              <SearchBox handleSearchFilter={this.handleSearchFilter} inputRef={el => this.inputElement = el} isSearched={this.state.isSearched} handleClear={this.handleClear}/>
              {
                this.isEmpty(this.state.catalog) == false &&
                <FilterTools catalog={this.state.catalog} handleSearchFilter={this.handleSearchFilter} isFiltered={this.state.isFiltered}/>
              }
            </div>
          </div>
        </div>
        <div className="container mt-5 mb-5">
          {
            this.state.isFetched == false ? 'Fetching...' :
            (
              this.state.isSearchedExist ? (
                this.isEmpty(this.state.catalog) == false &&
                <Listing catalog={this.state.catalog} isEmpty={this.isEmpty}/>
              ) :
              (
                'Nothing Found'
              )
            )
          }
        </div>
      </div>
    )
  }
}

export default Catalog;
