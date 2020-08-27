import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import Greeting from "./Containers/Greeting/Greeting";
import Login from "./Containers/Login/Login";
import MainComputers from "./Containers/MainComputers/MainComputers";
import AddComputers from "./Containers/AddComputers/AddComputers";
import Details from "./Containers/Deatails/Details";
import Header from './Components/Notification/Header/Header';
import ErrorNotFound from "./Components/ErrorNotFound/ErrorNotFound";
import Reviews from "./Containers/Reviews/Reviews";
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                {(window.location.pathname === '/'
                 || window.location.pathname === '/login'
                 || window.location.pathname === '/computers'
                 || window.location.pathname === '/computersgaming'
                 || window.location.pathname === '/computersoffice'
                 || window.location.pathname === '/computersbudget-gaming'
                 || window.location.pathname === '/addComputer'
                 || window.location.pathname === `/details/:id`
                 || window.location.pathname === '/reviews' ) ? (
                    <Switch>
                        <Route path="/" exact component={Greeting}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/computers" component={MainComputers}/>
                        <Route path="/computers:id" component={MainComputers}/>
                        <Route path="/addComputer" component={AddComputers}/>
                        <Route path="/details/:id" component={Details}/>
                        <Route path="/reviews" component={Reviews}/>
                    </Switch>
                ) : (
                    <ErrorNotFound/>
                )}
            </div>
    )
  }
}

export default App;
