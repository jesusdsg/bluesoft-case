import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface User {
  id?: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private collectionName = 'users';

  constructor(private firestore: AngularFirestore) {}

  getUsers(): Observable<User[]> {
    return this.firestore
      .collection<User>(this.collectionName)
      .valueChanges({ idField: 'id' });
  }

  addUser(user: User): Promise<any> {
    return this.firestore.collection(this.collectionName).add(user);
  }

  updateUser(id: string, user: Partial<User>): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).update(user);
  }

  deleteUser(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}
