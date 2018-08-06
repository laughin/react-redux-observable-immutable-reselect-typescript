import invariant from 'invariant';
import { isEmpty, isFunction, isString } from 'lodash';
import { Reducer } from 'redux';
import rootReducer from '../store/reducer';
import { LifeStore } from '../store/model';
import checkStore from './checkStore';

export function injectReducerFactory(store: LifeStore, isValid: boolean) {
  return function injectReducer(key: string, reducer: Reducer<object>) {
    if (!isValid) { checkStore(store); }
    invariant(
      isString(key) && !isEmpty(key) && isFunction(reducer),
      '(app/utils...) injectReducer: Expected `reducer` to be a reducer function'
    );
    if (Reflect.has(store.asyncReducers, key) && store.asyncReducers[key] === reducer) {
      return;
    }
    store.asyncReducers[key] = reducer;
    store.replaceReducer(rootReducer(store.asyncReducers));
  };
}

export default function getInjectors(store: LifeStore) {
  checkStore(store);
  return {
    injectReducer: injectReducerFactory(store, true),
  };
}
