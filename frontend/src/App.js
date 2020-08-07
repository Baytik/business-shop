import React, {Component} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Greeting from "./Containers/Greeting/Greeting";
import Login from "./Containers/Login/Login";
import MainComputers from "./Containers/MainComputers/MainComputers";
import AddComputers from "./Containers/AddComputers/AddComputers";

class App extends Component {
  render() {
    return (
        <div className="App">
            <Switch>
                <Route path="/" exact component={Greeting}/>
                <Route path="/login" component={Login}/>
                <Route path="/computers" component={MainComputers}/>
                <Route path="/addComputer" component={AddComputers}/>
            </Switch>
        </div>
    )
  }
}

export default App;
