import React, {Component} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Header from "./Components/Header/Header";
import Greeting from "./Containers/Greeting/Greeting";
import Login from "./Containers/Login/Login";

class App extends Component {
  render() {
    return (
        <div classNa me="App">
            <Header/>
            <Switch>
                <Route path="/" exact component={Greeting}/>
                <Route path="/login" component={Login}/>
          </Switch>
        </div>
    )
  }
}

export default App;
