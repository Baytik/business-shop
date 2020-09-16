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
import NotFeedbackReviews from "./Containers/NotFeedbackReviews/NotFeedbackReviews";
import SupportService from "./Containers/SupportService/SupportService";
import Requests from "./Containers/Requests/Requests";
import EditComputer from "./Containers/EditComputer/EditComputer";
import './App.css';
import Footer from "./Components/Notification/Footer/Footer";
import {fetchId} from "./store/actions/pcAction";
import {connect} from 'react-redux';

class App extends Component {

    state = {
        details:'',
        edits:'',
    };

    componentDidMount() {
        this.props.fetchId();
        setTimeout(this.findId,50)
    }

    findId = () => {
        const idForDetails = [];
        const idForEdit = [];

        Object.keys(this.props.computerId).forEach(id => {
            const ids = `/details/${this.props.computerId[id]._id}`;
            const ids2 = `/edit/${this.props.computerId[id]._id}`;
            idForDetails.push(ids);
            idForEdit.push(ids2);
        });

        for (let i = 0; i < idForDetails.length; i++) {
            if(window.location.pathname === idForDetails[i]) {
                this.setState({details: idForDetails[i]})
            }
        }
        for (let i = 0; i < idForEdit.length; i++) {
            if(window.location.pathname === idForEdit[i]) {
                this.setState({details: idForEdit[i]})
            }
        }
    };

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
                    || window.location.pathname === this.state.details
                    || window.location.pathname === '/reviews'
                    || window.location.pathname === '/notFeedbackReviews'
                    || window.location.pathname === '/support'
                    || window.location.pathname === '/requests'
                    || window.location.pathname === this.state.edits) ? (
                    <Switch>
                        <Route path="/" exact component={Greeting}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/computers" component={MainComputers}/>
                        <Route path="/computers:id" component={MainComputers}/>
                        <Route path="/addComputer" component={AddComputers}/>
                        <Route path="/details/:id" component={Details}/>
                        <Route path="/reviews" component={Reviews}/>
                        <Route path="/notFeedbackReviews" component={NotFeedbackReviews}/>
                        <Route path="/support" component={SupportService}/>
                        <Route path="/requests" component={Requests}/>
                        <Route path="/edit/:id" component={EditComputer}/>
                    </Switch>
                ) : (
                    <>
                        <ErrorNotFound/>
                    </>
                )}
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
   computerId: state.computerId.computerId,
});

const mapDispatchToProps = dispatch => ({
    fetchId: () => dispatch(fetchId()),
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
