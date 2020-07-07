import { uuid } from 'uuidv4';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(requestCreate: Request): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if (
      requestCreate.type === 'outcome' &&
      balance.outcome + requestCreate.value > balance.income
    ) {
      throw new Error('OutCome exceed the income value');
    }

    const { title, value, type } = requestCreate;
    const inserted = this.transactionsRepository.create({
      id: uuid(),
      title,
      value,
      type,
    });

    return inserted;
  }
}

export default CreateTransactionService;
