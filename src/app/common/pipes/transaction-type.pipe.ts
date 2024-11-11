import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionType',
  standalone: true,
})
export class TransactionTypePipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'withdrawal':
        return 'Retiro';
      case 'deposit':
        return 'Depósito';
      case 'transfer':
        return 'Transferencia';
      default:
        return value;
    }
  }
}
