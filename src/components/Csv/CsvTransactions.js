import {Component} from "react";
import {CsvTransactionMonth} from "./CsvTransactionMonth";

export class CsvTransactions extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    const { locale, transactionMonths } = this.props;

    const months = transactionMonths.map(t => {
      const year = t.date.getFullYear();
      const month = t.date.getMonth();
      return <CsvTransactionMonth key={`month_${year}_${month}`} month={t} locale={locale}></CsvTransactionMonth>;
    });

    return (
      <div className="csv-transactions-container">
        {months}
      </div>
    );
  }

}
