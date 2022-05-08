import { Component } from "react";
import {CsvParser} from "./CsvParser";
import { CsvRawTable } from "./CsvRawTable";
import {CsvCategoryParser} from "./CsvCategoryParser";
import {CsvTransactionsParser} from "./CsvTransactionsParser";
import {CsvTransactions} from "./CsvTransactions";
import css from './Csv.css';

class Csv extends Component {
  /**
   * @type {CsvSettings}
   */
  categoryData = undefined;

  /**
   * @type {CsvData}
   */
  rawCsvData = undefined

  constructor() {
    super();
    this.state = {
      error: '',
      table: undefined,
      transactionMonths: undefined,
    }
  }

  addedCategories = async (event) => {
    const csvParser = new CsvParser();
    const categoryParser = new CsvCategoryParser();
    try {
      const contents = await csvParser.getFileContent(event);
      this.categoryData = categoryParser.getCategoryData(contents);

      this.tryUpdateData('');
    } catch (e) {
      this.categoryData = undefined;
      this.tryUpdateData(e);
    }
  }

  addedCsv = async (event) => {
    const csvParser = new CsvParser();
    try {
      const contents = await csvParser.getFileContent(event);
      const rawData = csvParser.parseCSV(contents, ';');
      const mergedData = csvParser.tryMergeData(rawData, this.rawCsvData);
      this.rawCsvData = mergedData;
      this.tryUpdateData('');
    } catch (e) {
      this.rawCsvData = undefined;
      this.tryUpdateData(e);
    }
  }

  tryUpdateData(error) {
    let tableData = this.getTableData();
    const transactionMonths = this.getTransactions();

    this.setState({
      error,
      table: tableData,
      transactionMonths: transactionMonths,
    });
  }

  getTableData() {
    if (!this.categoryData || !this.rawCsvData) {
      return this.rawCsvData;
    }

    const rows = [];
    const headers =  this.rawCsvData.headers.filter((h, index) => this.categoryData.columnIds.includes(index));
    for (const row of this.rawCsvData.rows) {
      const newRow = [];
      for (let i = 0; i < this.rawCsvData.headers.length; i++) {
        if (!this.categoryData.columnIds.includes(i)) {
          continue;
        }

        newRow.push(row[i]);
      }
      rows.push(newRow);
    }

    return {
      headers,
      rows
    };
  }

  /**
   * @return {undefined}
   */
  getTransactions() {
    const transactionsParser = new CsvTransactionsParser();
    const rawMonthlyTransactions = transactionsParser.getRawTransactionsByMonth(this.rawCsvData, this.categoryData);

    const months = [];
    for (const rawMonth of rawMonthlyTransactions) {
      const month = transactionsParser.getHandledMonth(rawMonth, this.categoryData);
      months.push(month);
    }

    return months;
  }

  render() {
    const { error, table, transactionMonths } = this.state;

    return (
    <div className="csv-container">
      <div className="inputs" style={{ display: "flex" }}>
        <div>
          <label htmlFor={"categories"}>Categories</label>
          <br />
          <input type="file" name="categories" onChange={this.addedCategories} />
        </div>
        <div>
          <label htmlFor={"csvfile"}>Transactions</label>
          <br />
          <input type="file" name="csvfile" onChange={this.addedCsv} />
        </div>
      </div>
      <div className="error">{error}</div>
      <div className="output">
        {transactionMonths && this.categoryData && <CsvTransactions transactionMonths={transactionMonths} locale={this.categoryData.locale}></CsvTransactions>}
        {table && <CsvRawTable data={table}></CsvRawTable>}
      </div>
    </div>
    );
  }
}

export default Csv;
