import React, { Component } from "react";

class Expense extends Component {

  constructor (props) {
    super();
    this.state = {
      expense: props.item,
      index: props.index
    };
  }

  getVerboseDate (date) {
    return date.substring(8);
  }

  getBackgroundColour (colour) {
    return colour;
  }

  render () {
    const trStyle = {
      backgroundColor: this.getBackgroundColour(this.state.expense.category.colour)
    };

    return (
      <tr style={trStyle}>
        <td title={this.state.expense.category.name}>
          {this.state.expense.description}
        </td>
        <td>
          {this.state.expense.price}€
        </td>
        <td>
          {this.getVerboseDate(this.state.expense.date)}
        </td>
      </tr>
    )
  }
}

export default Expense;