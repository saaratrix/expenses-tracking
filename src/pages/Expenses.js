import React, { Component } from "react";
import Year from "../components/Year";

class Expenses extends Component {

  constructor () {
    super();
    this.state = { expenses: [] };
  }

  componentDidMount () {
    fetch("/api/expenses/getsorted")
    .then(response => response.json())
    .then(json => this.setState({ expenses: json }) )
  }

  render () {
    const yearItems = this.state.expenses.map( item =>  {
      return (
        <Year key={item.year} item={item}></Year>
      );
    });

    return (
      <div>
        <h2>Expenses</h2>
        {yearItems}
      </div>
    )
  }
}

export default Expenses;