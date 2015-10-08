import { LOAD_ITEMS, SELECT_ITEM } from '../constants/action_types';

export default function itemData(state = { matchups: [], items: [] }, action) {
  switch (action.type) {
  case LOAD_ITEMS:
    var matchups = [];
    var score = 1;

    action.items.forEach(function(item) {
      item.priority = score;
      score += 1;
    });

    action.items.forEach(function(item, index) {
      for(var i = index + 1; i < action.items.length; i++) {
        matchups.push({
          item1: item,
          item2: action.items[i]
        });
      }
    });

    return {
      items: action.items,
      matchups: matchups
    };

  case SELECT_ITEM:
    var selectedItem = action.item;

    var matchups = state.matchups.filter(function(matchup) {
      return matchup !== action.matchup;
    });

    var matchup = action.matchup;
    var otherItem = selectedItem === matchup.item1 ? matchup.item2 : matchup.item1;

    if (selectedItem.priority < otherItem.priority) {
      var selectedItemPriority = selectedItem.priority;
      var item2Priority = otherItem.priority;

      selectedItem.priority = item2Priority;
      otherItem.priority = selectedItemPriority;
    }

    return Object.assign({}, state, {
      matchups: matchups
    });

  default:
    return state;
  }
}
