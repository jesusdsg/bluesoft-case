import { createAction, props } from '@ngrx/store';
import { IUser } from '../types/User';

export const login = createAction('[Auth] Login', props<{ user: IUser }>());
export const logout = createAction('[Auth] Logout');
