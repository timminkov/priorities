import * as types from '../constants/action_types';

export function loadItems(items) {
  return { type: types.LOAD_ITEMS, items };
}

export function selectItem(matchup, item) {
  return { type: types.SELECT_ITEM, matchup, item};
}
