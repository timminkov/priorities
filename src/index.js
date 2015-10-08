import React from 'react';
import App from './components/app';
import '../css/app.scss';
import store from './store/configure_store';
import { Provider } from 'react-redux';
import { loadItems } from './actions/items';

fetch('/priorities')
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    store.dispatch(loadItems(json.priorities));

    React.render(
      <Provider store={store} >
        {() => <App />}
      </Provider>,
      document.body
    );
  });

