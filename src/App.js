import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

import Home from './pages/Home';
import Categories from './pages/Categories';
import Category from './pages/Category';
import AddCategory from "./pages/AddCategory";
import Expenses from './pages/Expenses';

class App extends Component {
  constructor() {
    super();
  }

  componentDidMount () {
  }

  render() {

    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/expenses">Expenses</Link>
            </li>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
          </ul>
          <hr />
          <Route exact path="/" component={Home} />
          <Route path="/expenses" component={Expenses} />
          <Route path="/categories" component={Categories} />
          <Route path="/category-create/" component={AddCategory} />
          <Route path="/category/:id?" component={Category} />
        </div>
      </Router>
    );
  }
}

export default App;
