import { connect } from 'react-redux';
import React from 'react';
import { loadItems, selectItem } from '../actions/items';
import Selector from './selector';
import Priorities from './priorities';

const data = [
  {
    description: 'nginx',
    priority: 1,
    done: false
  },
  {
    description: 'flaky tests',
    priority: 2,
    done: false
  },
  {
    description: 'deploys',
    priority: 3,
    done: false
  },
  {
    description: 'campaign model',
    priority: 4,
    done: false
  }
];

var App = React.createClass({
  componentDidMount: function() {
    this.props.dispatch(loadItems(data));
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

    return (
      <div>
        {selector}
        <Priorities items={items} />
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
