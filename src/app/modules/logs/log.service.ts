import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ITransaction } from '../../types/Transaction';
import { transactionsCollection } from '../../../utils/constants';
import { IUser } from '../../types/User';

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

  async getTransactionCountByUser(
    month: number,
    year: number
  ): Promise<{ uid: string; transactionCount: number }[]> {
    const startOfMonth = new Date(year, month - 1, 1).getTime();
    const endOfMonth = new Date(year, month, 0, 23, 59, 59).getTime();

    try {
      const snapshot = await this.firestore
        .collection<ITransaction>(transactionsCollection, (ref) =>
          ref
            .where('createdAt', '>=', startOfMonth)
            .where('createdAt', '<=', endOfMonth)
            .orderBy('createdAt', 'desc')
        )
        .get()
        .toPromise();

      // Count the transactions
      const transactionCounts: { [uid: string]: number } = {};

      snapshot?.docs?.forEach((doc) => {
        const transaction = doc.data() as ITransaction;
        const uid = transaction.uid;
        if (transactionCounts[uid]) {
          transactionCounts[uid] += 1;
        } else {
          transactionCounts[uid] = 1;
        }
      });

      const sortedCounts = Object.entries(transactionCounts)
        .map(([uid, transactionCount]) => ({ uid, transactionCount }))
        .sort((a, b) => b.transactionCount - a.transactionCount);

      return sortedCounts;
    } catch (error) {
      console.error('Error fetching transaction counts:', error);
      return [];
    }
  }

  async getTransactionCountWithUserDetails(
    month: number,
    year: number
  ): Promise<
    { uid: string; name: string; email: string; transactionCount: number }[]
  > {
    const startOfMonth = new Date(year, month - 1, 1).getTime();
    const endOfMonth = new Date(year, month, 0, 23, 59, 59).getTime();

    try {
      const snapshot = await this.firestore
        .collection<ITransaction>(transactionsCollection, (ref) =>
          ref
            .where('createdAt', '>=', startOfMonth)
            .where('createdAt', '<=', endOfMonth)
            .orderBy('createdAt', 'desc')
        )
        .get()
        .toPromise();
      const transactionCounts: {
        [uid: string]: { count: number; name: string; email: string };
      } = {};

      for (const doc of snapshot?.docs || []) {
        const transaction = doc.data() as ITransaction;
        const uid = transaction.uid;

        const userSnapshot = await this.firestore
          .collection('users')
          .doc(uid)
          .get()
          .toPromise();

        const userData = userSnapshot?.data() as IUser;
        const userName = userData?.name || 'Unknown User';
        const userEmail = userData.email || 'Unknown Email';

        if (transactionCounts[uid]) {
          transactionCounts[uid].count += 1;
        } else {
          transactionCounts[uid] = {
            count: 1,
            name: userName,
            email: userEmail,
          };
        }
      }
      const sortedCounts = Object.entries(transactionCounts)
        .map(([uid, { count, name, email }]) => ({
          uid,
          name,
          email,
          transactionCount: count,
        }))
        .sort((a, b) => b.transactionCount - a.transactionCount);

      return sortedCounts;
    } catch (error) {
      console.error(
        'Error fetching transaction counts with user details:',
        error
      );
      return [];
    }
  }
}
