import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { usersCollection } from '../../utils/constants';

export interface User {
  id?: string;
  name?: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

  getUsers(): Observable<User[]> {
    return this.firestore
      .collection<User>(usersCollection)
      .valueChanges({ idField: 'id' });
  }

  addUser(user: User): Promise<any> {
    return this.firestore.collection(usersCollection).doc(user.id).set(user);
  }

  updateUser(id: string, user: Partial<User>): Promise<void> {
    return this.firestore.collection(usersCollection).doc(user.id).update(user);
  }

  deleteUser(id: string): Promise<void> {
    return this.firestore.collection(usersCollection).doc(id).delete();
  }
}
