import { IUser } from '../app/types/User';

export function getStorage() {
  return typeof localStorage !== 'undefined' ? localStorage : null;
}

export function getLocalStorageUser(): IUser | null {
  if (typeof localStorage !== 'undefined') {
    const userData = localStorage.getItem('auth');
    if (userData) {
      const parsedData = JSON.parse(userData);
      return parsedData?.user || null;
    }
    return null;
  }
  return null;
}
