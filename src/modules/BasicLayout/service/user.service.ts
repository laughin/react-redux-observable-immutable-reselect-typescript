import { Observable } from 'rxjs';
import { loginActions } from '../actions';
import AxiosAPI from '../../../utils/axios-api';
import { Action } from '../../../store/model';

export default class UserService {
  login(action: Action) {
    return Observable.create((obs: any) => {
      AxiosAPI.get(`https://api.github.com/users/${action.payload.username}`)
        .then((response) => {
          obs.next(loginActions.success(response.data));
          obs.complete();
        })
        .catch(err => {
          obs.next(loginActions.fail(err));
          obs.complete();
        });
    });
  }
}