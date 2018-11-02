import React, { Component } from "react";
import Expense from "./Expense";

const Months = [
  "",
  "",
  "",
  "",
  "",
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
      expenses: props.item.expenses
    };
  }

  getMonth(month) {
    return Months[month];
  }

  render () {


    return (
      <div>
        <p>A month item - {this.getMonth(this.state.month)}</p>
      </div>
    )
  }
}

export default Month;