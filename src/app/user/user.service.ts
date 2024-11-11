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

  async getUser(uid: string): Promise<IUser | undefined> {
    const docSnapshot = await this.firestore
      .collection<IUser>(usersCollection)
      .doc(uid)
      .get()
      .toPromise();

    return docSnapshot?.data();
  }

  addUser(user: IUser): Promise<any> {
    return this.firestore.collection(usersCollection).doc(user.uid).set(user);
  }

  updateUser(uid: string, user: Partial<IUser>): Promise<void> {
    return this.firestore.collection(usersCollection).doc(uid).update(user);
  }

  deleteUser(uid: string): Promise<void> {
    return this.firestore.collection(usersCollection).doc(uid).delete();
  }
}
