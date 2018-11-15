import React, { Component } from "react";
import Expense from "./Expense";

const Months = [
  "Tammikuuta",
  "Helmikuuuta",
  "Maaliskuuta",
  "Huhtikuuta",
  "Toukokuuta",
  "Kesäkuuta",
  "Heinäkuuta",
  "Elokuuta",
  "Syyskuuta",
  "Lokakuuta",
  "Marraskuuta",
  "Joulukuuta",
];

class Month extends Component {


  constructor (props) {
    super();
    this.state = {
      month: props.item.month,
      expenses: props.item.expenses,
      isVisible: true
    };
  }

  getMonth(month) {
    return Months[month];
  }

  toggleVisibility () {
    this.setState({
      isVisible: !this.state.isVisible
    });
  }

  render () {
    let index = 0;
    const expenseItems = this.state.expenses.map( item =>  {
      return (
        <Expense key={item.id} item={item} index={index++}></Expense>
      );
    });

    return (
      <div>
        <h4>{this.getMonth(this.state.month)}</h4>
        <table className="month-table">
          <thead>
            <tr>
              <td>
                <strong>Item</strong>
              </td>
              <td>
                <strong>Price</strong>
              </td>
              <td>
                <strong>Day</strong>
              </td>
            </tr>
          </thead>
          <tbody>
          {expenseItems}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Month;