import { createReducer, on } from '@ngrx/store';
import { login, logout } from './auth.actions';
import { IUser } from '../types/User';

export interface AuthState {
  user: IUser | null;
}

export const initialState: AuthState = {
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state, { user }) => ({ ...state, user })),
  on(logout, (state) => ({ ...state, user: null }))
);
