import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

require('dotenv').config();

ReactDOM.render(
  <>
    <App />
  </>,
  document.getElementById('root')
);

serviceWorkerRegistration.unregister();
reportWebVitals();
