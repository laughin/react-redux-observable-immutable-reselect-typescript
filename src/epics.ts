import { combineEpics, Epic } from 'redux-observable';
import appEpics from './modules/App/epics';
import { Action } from './store/model';

export default function createRootEpics(): Epic<Action, Action, object> {
  return combineEpics(appEpics);
}
