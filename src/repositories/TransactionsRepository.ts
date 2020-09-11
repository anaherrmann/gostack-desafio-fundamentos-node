import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeBalance = this.transactions
      .filter(transaction => {
        return transaction.type === 'income';
      })
      .reduce((sum, transaction): number => {
        return sum + transaction.value;
      }, 0);

    const outcomeBalance = this.transactions
      .filter(transaction => {
        return transaction.type === 'outcome';
      })
      .reduce((sum, transaction): number => {
        return sum + transaction.value;
      }, 0);

    const totalBalance = incomeBalance - outcomeBalance;

    return {
      income: incomeBalance,
      outcome: outcomeBalance,
      total: totalBalance,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
