import {parseNumber} from "./number-parser";

export class CsvTransactionsParser {

  /**
   * @param {CsvData} csvData
   * @param {CsvSettings} categoryData
   * @return {RawTransactionMonth[]}
   */
  getRawTransactionsByMonth(csvData, categoryData) {
    if (!csvData || !categoryData) {
      return [];
    }

    /**
     * @type {RawTransaction[]}
     */
    const rows = [];

    try {
      const multiplier = categoryData.flipAmount ? -1 : 1;
      for (const row of csvData.rows) {
        const date = new Date(row[categoryData.dateColumn]);
        const amount = parseNumber(row[categoryData.amountColumn], categoryData.locale) * multiplier;
        const recipient = row[categoryData.recipientColumn];
        const message = row[categoryData.messageColumn];

        rows.push({
          date,
          amount,
          recipient,
          message,
        });
      }
    } catch (e) {
      throw new Error("Failed to get transactions", e);
    }

    const transactionsPerMonth = [];

    for (const row of rows) {
      const year = row.date.getFullYear();
      const month = row.date.getMonth();
      let transaction = transactionsPerMonth.find(t => t.month === month);
      if (!transaction) {
        transaction = {
          year,
          month,
          transactions: []
        }
        transactionsPerMonth.push(transaction);
      }

      transaction.transactions.push(row);
    }

    return transactionsPerMonth;
  }

  /**
   * @param {RawTransactionMonth} month
   * @param {CsvSettings} categoryData
   * @return {TransactionMonth}
   */
  getHandledMonth(month, categoryData) {
    /**
     *
     * @type {TransactionByCategory[]}
     */
    const transactionsByCategories = [];

    for (const transaction of month.transactions) {
      const category = this.getCategory(transaction, categoryData.categories);

      let byCategory = transactionsByCategories.find(t => t.name === category.name);
      if (!byCategory) {
        byCategory = {
          name: category.name,
          amount: 0,
          sortOrder: category.sortOrder,
          transactions: [],
        };
        transactionsByCategories.push(byCategory);
      }

      // Can be multiple categories, so we automatically set the lowest one.
      if (category.sortOrder < byCategory.sortOrder) {
        byCategory.sortOrder = category.sortOrder;
      }

      byCategory.transactions.push(transaction);
      byCategory.amount += transaction.amount;
    }

    transactionsByCategories.sort((a, z) => a.sortOrder - z.sortOrder);

    return {
      date: new Date(month.year, month.month, 1),
      transactionsByCategories,
    };
  }

  /**
   * @param {RawTransaction} transaction
   * @param {CsvCategory[]}categories
   * @return {CsvCategory}
   */
  getCategory(transaction, categories) {
    for (const category of categories) {
      let hits = 0;
      let needHits = !!category.messageRegex + !!category.recipientRegex;
      if (needHits < 1) {
        console.log(`category ${category.name} need to have message or recipient regex`);
        continue;
      }

      if (category.messageRegex?.test(transaction.message)) {
        hits++;
      }

      if (category.recipientRegex?.test(transaction.recipient)) {
        hits++;
      }

      if (hits >= needHits) {
        return category;
      }
    }

    return {
      name: 'Unknown',
      regex: undefined,
      recipientRegex: undefined,
      sortOrder: categories.length,
    };
  }
}
