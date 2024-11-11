import { Injectable } from '@angular/core';
import { ITransaction } from '../../types/Transaction';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { transactionsCollection } from '../../../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private firestore: AngularFirestore) {}

  addTransaction(transaction: ITransaction): Promise<any> {
    return this.firestore.collection(transactionsCollection).add(transaction);
  }
}
