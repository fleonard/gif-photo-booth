import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './views/App';
import store from './store';

render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('app'));

// Needed for the development to HMR the express view
if (module.hot) module.hot.accept();
