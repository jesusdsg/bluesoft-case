import { IUser } from '../app/types/User';

export function getStorage() {
  return typeof localStorage !== 'undefined' ? localStorage : null;
}

export function getLocalStorageUser(): IUser | null {
  if (typeof localStorage !== 'undefined') {
    const user = localStorage.getItem('auth');
    return user ? JSON.parse(user) : null;
  }
  return null;
}
