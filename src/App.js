import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      expenses: [{ id: 0, description: "" }],
      test: "",
      message: ''
    };
  }

  componentDidMount() {
    fetch("/api/expenses/get")
      .then(response => response.json())
      .then(json => this.setState(() => {
        return {
          test: json.expenses[0].description
        };
      }));
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{this.state.test}</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
