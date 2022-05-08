import {Component} from "react";

export class CsvTransactionMonthDetailed extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { month } = this.props;

    const categories = month.transactionsByCategories.map(t => {
      const rows = t.transactions.map((transaction, index) => {
        // Source for month & day:
        // https://stackoverflow.com/a/19448513
        const month = ("0" + (transaction.date.getMonth() + 1)).slice(-2);
        const day = ("0" + (transaction.date.getDate() + 1)).slice(-2);
        const date = `${transaction.date.getFullYear()}-${month}-${day}`;
        return (
          <tr key={`t_details_${t.name}_${index}`}>
            <td>{date}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.recipient}</td>
            <td>{transaction.message}</td>
          </tr>
        );
      });

      return (
        <div key={`t_details_${t.name}`}>
          <h3>{t.name}</h3>
         <table>
           <thead>
           <tr>
             <td>Date</td>
             <td>Amount</td>
             <td>Recipient</td>
             <td>Message</td>
           </tr>
           </thead>
           <tbody>
           {rows}
           </tbody>
         </table>
        </div>
      );
    });

    return (
      <details className="csv-transaction-month-detailed-container">
        <summary>Detailed view</summary>
        {categories}
      </details>
    );
  }
}
