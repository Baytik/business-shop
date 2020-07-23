import React, {Component} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Header from "./Components/Header/Header";
import Login from "./Containers/Login/Login";

class App extends Component {
  render() {
    return (
        <div className="App">
          <Header/>
          <Switch>
            <Route path="/login" component={Login}/>
          </Switch>
        </div>
    )
  }
}

export default App;
