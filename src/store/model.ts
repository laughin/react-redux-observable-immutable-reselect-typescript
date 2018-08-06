import { Store } from 'redux';
import { RouterState } from 'react-router-redux';

export interface LifeStore extends Store<{}> {
  asyncReducers?: any;
}

export interface Action {
  type: string;
  [propName: string]: any;
}

export interface InjectReducerParams {
  key: string;
  reducer: (state: any, action: Action) => any;
}

export interface RootState {
  route: RouterState;
  [propName: string]: any;
}
