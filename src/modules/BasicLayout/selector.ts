import { createSelector } from 'reselect';

import { RootState } from '../../store/model';

const getBasic = (state: RootState) => state.get('basic');

const selectLoginUser = () => createSelector(
  getBasic,
  loginState => loginState.get('loginUser')
);

const selectLoading = () => createSelector(
  getBasic,
  loginState => loginState.get('loading')
);

export {
  selectLoginUser,
  selectLoading,
};