import React, { Component } from "react";
import Month from "./Month";

class Year extends Component {



  constructor (props) {
    console.log("item:",  props.item);
    super();
    this.state = { year: props.item.year, months: props.item.months };
  }

  render () {
    const monthItems = this.state.months.map( item =>  {
      return (
        <Month key={item.month} item={item}></Month>
      );
    });

    return (
      <div>
        <p>A year item - {this.state.year}</p>
        {monthItems}
      </div>
    )
  }
}

export default Year;