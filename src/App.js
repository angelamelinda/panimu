import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Catalog from './containers/Catalog';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path='/' component={Catalog} exact/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
