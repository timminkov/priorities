import * as types from '../constants/action_types';

export function loadItems(items) {
  return { type: types.LOAD_ITEMS, items };
}

export function selectItem(matchup, item) {
  return { type: types.SELECT_ITEM, matchup, item};
}

function submitPriorities(items) {
  return dispatch => {
    var isDevelopment = (process.env.NODE_ENV !== 'production');
    var rootURL = isDevelopment ? 'http://localhost:8080' : '';
    return fetch(rootURL + '/submit_priorities', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: items
      })
    })
      .then(response => response.json())
      .then(json => { return { type: 'SOMETHING' } })
  };
}

function shouldSubmitPriorities(matchups) {
  return !!!matchups.length;
}

export function submitPrioritiesIfDone(matchups, items) {
  return (dispatch, getState) => {
    if (shouldSubmitPriorities(matchups)) {
      return dispatch(submitPriorities(items));
    } else {
      console.log('do not submit');
      return Promise.resolve();
    }
  };
}
