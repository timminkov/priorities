import React from 'react';
import App from './components/app';
import '../css/app.scss';
import store from './store/configure_store';
import { Provider } from 'react-redux';

React.render(
  <Provider store={store} >
    {() => <App />}
  </Provider>,
  document.body
);
