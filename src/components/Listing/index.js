import React, { Component } from 'react';

class Listing extends Component {
  render() {
    return (
      <div className="row">
        {
          this.props.isEmpty(this.props.catalog.phones) == false &&
          Object.keys(this.props.catalog.phones).map((key, id) => (
            <div className="col-lg-4 col-md-6 col-12 mb-4" key={key}>
              <div className="box-shadow p-4 rounded-25 box-scale-hover transition-ease h-100">
                <h5 className="color-tosca"><strong>{this.props.catalog.phones[key].name}</strong></h5>
                <p className="mb-3">{this.props.catalog.phones[key].description}</p>
                <p className="mb-0">Brand: <strong>{this.props.catalog.phones[key].brand}</strong></p>
                <p className="mb-0">Released: <strong>{this.props.catalog.phones[key].release_year}</strong></p>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}

export default Listing;
