import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ITransaction } from '../../types/Transaction';
import { transactionsCollection } from '../../../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  constructor(private firestore: AngularFirestore) {}

  async getTransactionsByMonth(
    uid: string,
    month: number,
    year: number
  ): Promise<ITransaction[]> {
    const startOfMonth = new Date(year, month - 1, 1).getTime();
    const endOfMonth = new Date(year, month, 0, 23, 59, 59).getTime();

    try {
      const snapshot = await this.firestore
        .collection<ITransaction>(transactionsCollection, (ref) =>
          ref
            .where('uid', '==', uid)
            .where('createdAt', '>=', startOfMonth)
            .where('createdAt', '<=', endOfMonth)
            .orderBy('createdAt', 'desc')
        )
        .get()
        .toPromise();

      return snapshot?.docs?.map((doc) => doc.data() as ITransaction) || [];
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  }
}
