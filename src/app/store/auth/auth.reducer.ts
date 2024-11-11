import { createReducer, on } from '@ngrx/store';
import { login, logout } from './auth.actions';
import { IUser } from '../../types/User';
import { getLocalStorageUser } from '../../../utils/localStorage';

export interface AuthState {
  user: IUser | null;
}

export const initialState: AuthState = {
  user: getLocalStorageUser(),
};

export const authReducer = createReducer(
  initialState,
  on(login, (state, { user }) => {
    sessionStorage.setItem('auth', JSON.stringify(user));
    return { ...state, user };
  }),
  on(logout, (state) => {
    sessionStorage.removeItem('auth');
    return { ...state, user: null };
  })
);
