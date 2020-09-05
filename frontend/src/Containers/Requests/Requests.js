import React, {Component} from 'react';
import './Requests.css';
import {connect} from 'react-redux';
import {fetchRequests} from "../../store/actions/RequestsActions";
import {Redirect} from 'react-router-dom';

class Requests extends Component {

    componentDidMount() {
        this.props.fetchRequests();
    }

    render() {
        console.log(this.props.requests)
        if(!this.props.user) return <Redirect to="/computers"/>;

        return (
            <div className="RequestsContainer">

            </div>
        );
    }
}

const mapStateToProps = state => ({
    requests: state.requests.requests,
    user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
   fetchRequests: () => dispatch(fetchRequests()),
});

export default connect(mapStateToProps,mapDispatchToProps)(Requests);