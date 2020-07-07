import Transaction from '../models/Transaction';

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
    let somaIncome = 0;
    let somaOutcome = 0;
    somaIncome = this.transactions
      .filter(f => f.type === 'income')
      .map(m => m.value)
      .reduce((a, b) => a + b, 0);
    somaOutcome = this.transactions
      .filter(f => f.type === 'outcome')
      .map(m => m.value)
      .reduce((a, b) => a + b, 0);

    const balance: Balance = {
      income: somaIncome,
      outcome: somaOutcome,
      total: somaIncome - somaOutcome,
    };

    return balance;
  }

  public create(Request: Transaction): Transaction {
    this.transactions.push(Request);
    return Request;
  }
}

export default TransactionsRepository;
