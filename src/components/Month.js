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

    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  getMonth(month) {
    return Months[month];
  }

  getTotal () {
    let total = 0;

    this.state.expenses.forEach((expense) => {
      total += expense.price
    });

    return total;
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
        <Expense key={item.id} item={item} index={index++} />
      );
    });

    const total = this.getTotal();

    const visibleStyle = {
      display: this.state.isVisible ? "block" : "none"
    };

    return (
      <React.Fragment>
        <h4 onClick={this.toggleVisibility} className={"month-header"} >{this.getMonth(this.state.month)} - {total} €</h4>
        <div style={visibleStyle}>
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
      </React.Fragment>
    );
  }
}

export default Month;