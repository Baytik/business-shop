import React, {Component} from 'react';
import Modal from "../../Components/UI/Modal/Modal";
import {postReviews} from "../../store/actions/ReviewsActions";
import {connect} from "react-redux";
import {toast,ToastContainer} from "react-toastify";
import './Reviews.css';

class Reviews extends Component {

    state = {
        key: '',
        reviews:'',
        modal:false,
    };

    inputValHandler = (e) => {
      this.setState({[e.target.name]: e.target.value});
    };

    showModal = () => {
        this.setState({modal: true})
    };

    closeModal = () => {
      this.setState({modal:false})
    };

    sendReviews = async () => {
        await this.props.postReviews({key: this.state.key, review: this.state.reviews});
        if(this.props.reviewsError){
            toast.error(`${this.props.reviewsError.error}`);
        }
    };

    render() {
        return (
            <div className="ReviewsContainer">
                <ToastContainer/>
                <button className="leave_reviews" onClick={this.showModal}>оставить отзыв</button>
                <Modal show={this.state.modal} close={this.state.modal}>
                    <div className="inputs_for_reviews">
                        <input className="key_input" type="text" placeholder="ваш ключ....." name="key" onChange={this.inputValHandler}/>
                        <textarea className="reviews_input" name="reviews" onChange={this.inputValHandler} placeholder="Ваш отзыв..."/>
                    </div>
                    <div className="close_or_leave">
                        <button className="close_modal_in_reviews" onClick={this.closeModal}>закрыть</button>
                        <button className="send_reviews" onClick={this.sendReviews}>оставить</button>
                    </div>
                </Modal>
                <div className="reviews">

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    reviewsError: state.reviewsError.reviewsError,
});

const mapDispatchToProps = dispatch => ({
   postReviews: (reviews) => dispatch(postReviews(reviews)),
});

export default connect(mapStateToProps,mapDispatchToProps) (Reviews);