import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faChevronDown, faChevronUp, faTimes } from '@fortawesome/free-solid-svg-icons';
library.add({faSearch, faChevronUp, faChevronDown, faTimes})

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
