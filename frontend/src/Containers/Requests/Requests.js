import React, {Component} from 'react';
import './Requests.css';
import './MediaRequests.css';
import {connect} from 'react-redux';
import {fetchRequests,completedRequest} from "../../store/actions/RequestsActions";
import {Redirect} from 'react-router-dom';
import WOW from "wow.js";
import Spinner from "../../Components/UI/Spinner/Spinner";
import {toast,ToastContainer} from "react-toastify";

class Requests extends Component {

    componentDidMount() {
        new WOW().init();
        this.props.fetchRequests('/requests/false');
    }

    completedHandler = async (id) => {
      await this.props.completedRequest(id);

      if(this.props.completedRequestError){
          toast.error(`${this.props.completedRequestError}`);
      }else {
          toast.success('Выполнено!');
      }
    };

    render() {
        if(!this.props.user) return <Redirect to="/computers"/>;
        if(this.props.user.role !== 'admin' && this.props.user.role !== 'operator') return <Redirect to="/computers"/>;

        return (
            <div className="RequestsContainer">
                <ToastContainer/>
                <div className="btns_requests">
                    <button onClick={() =>  this.props.fetchRequests('/requests/true')} className="true_requests">выполненные</button>
                    <button className="false_requests" onClick={() =>  this.props.fetchRequests('/requests/false')}>не выполненные</button>
                    <button className="all_requests" onClick={() => this.props.fetchRequests('/requests/all')}>все</button>
                </div>
                <div className="requests">
                    {this.props.spinner === true ? (
                        <Spinner/>
                    ) : (
                        this.props.requests.length === 0  ? (
                            <h3 className="empty_text_requests">Нечего нету</h3>
                        ) : (
                            this.props.requests && Object.keys(this.props.requests).map(request => (
                                    <div className="request_block wow animate__animated animate__fadeInLeft"
                                         style={{background: this.props.requests[request].completed === false ?
                                                 "rgba(193,3,0,0.64)" :
                                                 "rgba(22, 193, 0, 0.64)"}}
                                         key={request}>
                                        <p className="description_text">Вопрос или Проблема: {this.props.requests[request].description}</p>
                                        <p className="phone_text">Телефон: {this.props.requests[request].phone}</p>
                                        <p className="email_text">Email-адрес: {this.props.requests[request].email}</p>
                                        {this.props.requests[request].completed === false ? (
                                            <button className="performed" onClick={() => this.completedHandler(this.props.requests[request]._id)}>выполнено</button>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                ))
                        )
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    requests: state.requests.requests,
    user: state.user.user,
    spinner: state.requests.spinner,
    completedRequestError: state.requests.completedRequestError,
});

const mapDispatchToProps = dispatch => ({
    fetchRequests: (url) => dispatch(fetchRequests(url)),
    completedRequest: (id) => dispatch(completedRequest(id)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Requests);