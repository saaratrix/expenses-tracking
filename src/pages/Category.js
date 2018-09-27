import React, { Component } from "react";

import "./Categories.css";
import { Link } from "react-router-dom";

class Category extends Component {

  constructor (props) {
    super();
    this.state = {
      error: "",
      category: {
        id: props.match.params.id,
        name: "",
        colour: ""
      }
    };
  }

  componentDidMount () {
    if (!this.state.category.id) {
      return;
    }

    fetch("/api/categories/get/" + this.state.category.id)
    .then(response => response.json())
    .then(json => {
      var category = this.state.category;
      var error = "";

      if (json.category) {
        category = json.category;
        console.log("found a category!");
      }
      else {
        error = json.error;
      }

      return this.setState({
        category: category,
        error: error
      });
    });
  }

  render () {
    return (
      <div>
        <h2>Category - {this.state.category.name}</h2>
        {this.state.error.length > 0 &&
          <p className={"error"}>{this.state.error}</p>
        }

      </div>
    )
  }
}

export default Category;