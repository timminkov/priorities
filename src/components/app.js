import { connect } from 'react-redux';
import React from 'react';
import { loadItems, selectItem, submitPrioritiesIfDone } from '../actions/items';
import Selector from './selector';
import Priorities from './priorities';

var App = React.createClass({
  componentWillReceiveProps(nextProps) {
    const { dispatch, items, matchups } = nextProps;

    dispatch(submitPrioritiesIfDone(matchups, items));
  },

  render: function() {
    const { dispatch, items, matchups } = this.props;
    var selector;

    if (matchups.length) {
      selector = (
        <Selector
          matchup={matchups[0]}
          onSelect={this._onItemSelect}
        />
      );
    } else {
      selector = (
        <div className="selection__title">Done prioritizing!</div>
      );
    }

    //<Priorities items={items} />
    return (
      <div>
        {selector}
      </div>
    );
  },

  _onItemSelect(matchup, item) {
    this.props.dispatch(selectItem(matchup, item));
  }
});

function select(state) {
  return {
    items: state.itemData.items,
    matchups: state.itemData.matchups
  };
}

export default connect(select)(App);
