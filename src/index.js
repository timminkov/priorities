import React from 'react';
import App from './components/app';
import '../css/app.scss';
import configureStore from './store/configure_store';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);

React.render(
  <Provider store={store} >
    {() => <App />}
  </Provider>,
  document.body
);
