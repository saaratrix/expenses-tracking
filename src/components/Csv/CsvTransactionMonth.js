import {Component} from "react";
import {CsvTransactionMonthDetailed} from "./CsvTransactionMonthDetailed";

export class CsvTransactionMonth extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { locale, month } = this.props;

    const year = month.date.getFullYear();
    const monthDate = month.date.getMonth();
    const formatter = new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short' });
    const date = formatter.format(month.date);

    const rows = month.transactionsByCategories.map(t => {
      let formula = t.transactions.reduce((previous, item, index) => {
        let prefix = '';
        if (index > 0) {
          prefix = item.amount >= 0 ? '+' : '';
        }
        return previous + `${prefix}${item.amount}`
      }, '=');
      formula = formula.replaceAll('+', ' + ').replaceAll('-', ' - ');

      return (
        <tr key={`t_month_${year}_${monthDate}_${t.name}`}>
          <td title={t.amount}>{formula}</td>
          <td title={t.amount}>{t.name}</td>
        </tr>
      );
    });

    return (
      <div className="transaction-month-container">
        <h3>{date}</h3>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Formula</td>
            </tr>
          </thead>
          <tbody>
          {rows}
          </tbody>
        </table>
        <CsvTransactionMonthDetailed month={month}></CsvTransactionMonthDetailed>
      </div>
    );
  }

}
