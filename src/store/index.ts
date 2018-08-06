import { applyMiddleware, compose, createStore, Middleware, MiddlewareAPI } from 'redux';
import { createEpicMiddleware, Epic, ActionsObservable } from 'redux-observable';
import { routerMiddleware } from 'react-router-redux';
import { History } from 'history';
import { fromJS } from 'immutable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { mergeMap } from 'rxjs/operators';

import rootReducer from './reducer';
import { LifeStore, Action } from './model';
import createRootEpics from './../epics';

const epics = new BehaviorSubject(createRootEpics());

const rootEpic: Epic<Action, Action> = (action$: ActionsObservable<Action>, state$: MiddlewareAPI<Action>) =>
  epics.pipe(
    mergeMap(epic => epic(action$, state$, {}))
  );

export function injectEpics(key: string, newEpics: Epic<Action, Action>, newDependencies?: {}): void {
  epics.next(newEpics);
  console.log(`${key} page Epic is loaded!`);
}

export default (initialState = {}, history: History): LifeStore => {

  const epicMiddleware = createEpicMiddleware(rootEpic);

  const middlewares: Middleware[] = [
    routerMiddleware(history),
    epicMiddleware,
  ];

  const composeEnhancers: Function =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
      })
      : compose;

  const store: LifeStore = createStore(
    rootReducer(),
    fromJS(initialState),
    composeEnhancers(applyMiddleware(...middlewares))
  );

  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(rootReducer(store.asyncReducers));
    });
  }

  return store;
};
