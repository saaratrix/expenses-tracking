import React, { Component } from "react";

import "./Categories.css";
import { Link } from "react-router-dom";

class Categories extends Component {

  constructor () {
    super();
    this.state = {
      categories: []
    };
  }

  componentDidMount () {
    fetch("/api/categories/get")
    .then(response => response.json())
    .then(json => this.setState({ categories: json }) )
  }

  render () {
    const listItems = this.state.categories.map( category =>  {
      var style = {
        backgroundColor: category.colour
      };
      var className = "category-colour";

      return (
        <li key={category.id}>
          <Link to={"/category/" + category.id}>
            {category.name} - <div className={className} style={style}></div>
          </Link>
        </li>
      );
    });


    return (
      <div>
        <h2>Categories</h2>
        <ul>
          {listItems}
        </ul>
      </div>
    )
  }
}

export default Categories;