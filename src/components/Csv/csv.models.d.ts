export interface CsvCategory {
  name: string;
  messageRegex?: RegExp;
  recipientRegex?: RegExp;
  sortOrder: number;
}

export interface CsvSettings {
  columnIds: number[];
  dateColumn: number;
  amountColumn: number;
  recipientColumn: number;
  messageColumn: number;
  /**
   * en-GB, fi-FI, ...
   */
  locale: string;
  /**
   * If negative should be positive etc.
   */
  flipAmount: number;
  categories: CsvCategory[];
}

export interface CsvData {
  headers: string[]
  rows: string[];
}

export interface RawTransaction {
  date: Date;
  amount: number;
  recipient: string;
  message: string;
}

export interface RawTransactionMonth {
  date: Date,
  year: number;
  month: number;
  transactions: RawTransaction[];
}

export interface TransactionByCategory {
  name: string;
  amount: number;
  sortOrder: number,
  transactions: RawTransaction[]
}

export interface TransactionMonth {
  date: Date,
  transactionsByCategories: TransactionByCategory[];
}
