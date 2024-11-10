import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { usersCollection } from '../../utils/constants';
import { IUser } from '../types/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

  getUsers(): Observable<IUser[]> {
    return this.firestore
      .collection<IUser>(usersCollection)
      .valueChanges({ idField: 'id' });
  }

  addUser(user: IUser): Promise<any> {
    return this.firestore.collection(usersCollection).doc(user.uid).set(user);
  }

  updateUser(id: string, user: Partial<IUser>): Promise<void> {
    return this.firestore
      .collection(usersCollection)
      .doc(user.uid)
      .update(user);
  }

  deleteUser(id: string): Promise<void> {
    return this.firestore.collection(usersCollection).doc(id).delete();
  }
}
