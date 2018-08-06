import { Epic, ActionsObservable, combineEpics } from 'redux-observable';
import { filter, mergeMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { loginActions } from './actions';
import UserService from './service/user.service';
import { Action } from '../../store/model';

const userService = new UserService();

const loginEpic: Epic<Action, Action> = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    filter(isActionOf(loginActions.login)),
    mergeMap((action: Action) => userService.login(action)),
  );

export default combineEpics(
  loginEpic
);
