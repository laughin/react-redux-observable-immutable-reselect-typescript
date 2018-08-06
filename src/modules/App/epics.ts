import { ActionsObservable, Epic, combineEpics } from 'redux-observable';
import { filter, delay, mapTo } from 'rxjs/operators';

import { Action } from '../../store/model';

const pingEpic: Epic<Action, Action> = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    filter((action: Action) => action.type === 'PING'),
    delay(1000),
    mapTo({ type: 'PONG' })
  );

export default combineEpics(
  pingEpic
);
