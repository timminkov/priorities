import React from 'react';

export default React.createClass({
  render() {
    var matchup = this.props.matchup;

    return (
      <div>
        <div className="selection__title">Which of the following is more important...</div>
        <div className="selection__area">
          <div className="selector" onClick={this._onClickItem1}>{matchup.item1.description}</div>
          <div className="selector" onClick={this._onClickItem2}>{matchup.item2.description}</div>
        </div>
      </div>
    );
  },

  _onClickItem1() {
    this.props.onSelect(this.props.matchup, this.props.matchup.item1);
  },

  _onClickItem2() {
    this.props.onSelect(this.props.matchup, this.props.matchup.item2);
  }
});
