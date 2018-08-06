import { fromJS } from 'immutable';
import { Reducer } from 'redux';
import { getType } from 'typesafe-actions';
import { loginActions } from './actions';
import { LoginForm } from './model/loginForm.model';
import { LoginUser } from './model/loginUser.model';
import { RootState, Action } from '../../store/model';

const initialState: RootState = fromJS({
  loginForm: new LoginForm(),
  loginUser: new LoginUser(),
  errors: {},
  loading: false,
});

const reducer: Reducer<RootState> =
  (state: RootState = initialState, action: Action) => {
    switch (action.type) {
      case getType(loginActions.login):
        return state
          .set('loading', true)
          .set('loginForm', action.payload);
      case getType(loginActions.success): 
        return state
          .set('loading', false)
          .set('loginUser', action.payload);
      case getType(loginActions.fail):
        return state
          .set('loading', false)
          .set('errors', action.payload);
      case getType(loginActions.reset):
        return initialState;
      default:
        return state;
    }
  };

export default reducer;