import React from 'react';

export default React.createClass({
  render() {
    var items = this.props.items.sort(function(item1, item2) {
      return item2.priority - item1.priority;
    });

    var priorities = items.map(function(item) {
      return (
        <div className="priority">
          {item.description} => {item.priority}
        </div>
      );
    });

    return (
      <div className="priorities">
        {priorities}
      </div>
    );
  }
});
