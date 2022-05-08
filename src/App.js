import React, { Component } from 'react'
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

import Home from './pages/Home';
import Categories from './pages/Categories';
import Category from './pages/Category';
import AddCategory from "./pages/AddCategory";
import Expenses from './pages/Expenses';
import Csv from "./components/Csv/Csv";

class App extends Component {
  constructor() {
    super();
  }

  componentDidMount () {
  }

  render() {

    return (
      <BrowserRouter>
        <div>
          <ul>
            {/*<li><Link to="/">Home</Link></li>*/}
            {/*<li><Link to="/expenses">Expenses</Link></li>*/}
            {/*<li><Link to="/categories">Categories</Link></li>*/}
            {/*<li><Link to="/csv">CSV</Link></li>*/}
          </ul>
          {/*<hr />*/}
          <Routes>
            <Route exact path="/" element={<Csv />} />
            {/*<Route path="/expenses" element={<Expenses />} />*/}
            {/*<Route path="/categories" element={<Categories />} />*/}
            {/*<Route path="/category-create/" element={<AddCategory />} />*/}
            {/*<Route path="/category/:id?" element={<Category />} />*/}
            {/*<Route path="/csv" element={<Csv />} />*/}
          </Routes>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
