// auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { login, logout } from './auth.actions';
import { User } from 'firebase/auth';

export interface AuthState {
  user: User | null;
}

export const initialState: AuthState = {
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state, { user }) => ({ ...state, user })),
  on(logout, (state) => ({ ...state, user: null }))
);
