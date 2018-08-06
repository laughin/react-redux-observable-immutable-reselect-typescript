import conformsTo from 'lodash/conformsTo';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import invariant from 'invariant';
import { LifeStore } from '../store/model';

/**
 * Validate the shape of redux store
 */
export default function checkLifeStore(store: LifeStore) {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    asyncReducers: isObject,
  };
  invariant(
    conformsTo(store, shape),
    '(src/utils...) injectors: Expected a valid redux store'
  );
}
