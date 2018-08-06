import { ActionType, createAction } from 'typesafe-actions';
import { ILoginUser, ILoginForm } from './model';

export enum LoginActionTypes {
  LOGIN = '[Login] Login',
  SUCCESS = '[Login] Success',
  FAIL = '[Login] Fail',
  RESET = '[Login] Reset'
}

export const loginActions = {
  login: createAction(LoginActionTypes.LOGIN, resolve => {
    return (loginInput: ILoginForm) => resolve(loginInput);
  }),
  fail: createAction(LoginActionTypes.FAIL, resolve => {
    return (error: Error) => resolve(error);
  }),
  success: createAction(LoginActionTypes.SUCCESS, resolve => {
    return (loginUser: ILoginUser) => resolve(loginUser);
  }),
  reset: createAction(LoginActionTypes.RESET)
};

export type LoginAction = ActionType<typeof loginActions>;
