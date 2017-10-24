import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

import { types } from '../actions';

const ui = handleActions(
  {
    [types.CREATE_GIF] (state) {
      return { ...state };
    }
  },
  {

  }
);

const reducers = combineReducers({
  ui
});

export default reducers;

