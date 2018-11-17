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

  // Source: https://stackoverflow.com/questions/3732046/how-do-you-get-the-hue-of-a-xxxxxx-colour
  getBackgroundColour (colour) {
    var r = parseInt(colour.substr(1,2), 16); // Grab the hex representation of red (chars 1-2) and convert to decimal (base 10).
    var g = parseInt(colour.substr(3,2), 16);
    var b = parseInt(colour.substr(5,2), 16);

    r /= 255;
    g /= 255;
    b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    if (this.state.index % 2 === 1) {
      l -= 0.075;

      if (l < 0) {
        l = 0;
      }
    }

    h = parseInt(h * 360, 10);
    s = parseInt(s * 100, 10);
    l = parseInt(l * 100, 10);

    colour = `hsl(${h}, ${s}%, ${l}%)`;

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