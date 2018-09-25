import React, { Component } from "react";

class Expenses extends Component {

  constructor () {
    super();
    this.state = { expenses: [] };
  }

  componentDidMount () {
    fetch("/api/expenses/get")
    .then(response => response.json())
    .then(json => this.setState({ expenses: json }) )
  }

  getExpensesSortedByDate () {
    return [];
  }

  render () {
    const listItems = this.state.expenses.map( expense =>  {
      return (
        <li key={expense.id}>
          {expense.description}
        </li>
      );
    });

    return (
      <div>
        <h2>Expenses</h2>
        <ul>
          {listItems}
        </ul>
      </div>
    )
  }
}

export default Expenses;