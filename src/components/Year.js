import React, { Component } from "react";
import Month from "./Month";

class Year extends Component {



  constructor (props) {
    console.log("item:",  props.item);
    super();
    this.state = {
      year: props.item.year,
      months: props.item.months,
      isVisible: true
    };

    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  toggleVisibility () {
    this.setState({
      isVisible: !this.state.isVisible
    });
  }

  getTotal () {
    // Calculate total for a year.
  }

  render () {
    const monthItems = this.state.months.map( item =>  {
      return (
        <Month key={item.month} item={item} />
      );
    });

    const visibleStyle = {
      display: this.state.isVisible ? "block" : "none"
    };

    return (
      <div className={"year-container"}>
        <h3 onClick={this.toggleVisibility} className={"year-header"}>{this.state.year}</h3>
        <div className={"month-container"} style={visibleStyle}>
          {monthItems}
        </div>
      </div>
    );
  }
}

export default Year;