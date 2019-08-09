import React, { Component } from "react";

class AddCategory extends Component {
  constructor (props) {
    super();
    this.state = {
      error: "",
      category: {
        id: 0,
        name: "",
        colour: ""
      }
    };
  }

  render () {
    return (
      <div>
        <h2>Create new category</h2>
        {this.state.error.length > 0 &&
          <p className={"error"}>{this.state.error}</p>
        }
        <label for="name">Name</label>
        <input id="name" type="text" value={this.state.category.name} />
        <br />
        <label for="colour">Colour</label>
        <input id="colour" type="text" value={this.state.category.colour} />
        <br />
        <input type="submit" value="Create category" />
      </div>
    )
  }
}

export default AddCategory;
