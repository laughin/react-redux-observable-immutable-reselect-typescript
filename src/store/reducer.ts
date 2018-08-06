import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import { Action, RootState } from './model';

const routeInitialState = fromJS({
  location: null,
});

function routeReducer(state: RootState = routeInitialState, action: Action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.set('location', action.payload);
    default:
      return state;
  }
}

export default function rootReducer(asyncReducers?: any) {
  return combineReducers({
    route: routeReducer,
    ...asyncReducers,
  });
}
