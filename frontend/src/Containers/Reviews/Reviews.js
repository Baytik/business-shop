import React, {Component} from 'react';
import Modal from "../../Components/UI/Modal/Modal";
import {postReviews,fetchReviews,deleteReview} from "../../store/actions/ReviewsActions";
import {connect} from "react-redux";
import {toast,ToastContainer} from "react-toastify";
import './Reviews.css';
import './MediReviews.css';
import Spinner from "../../Components/UI/Spinner/Spinner";
import WOW from 'wow.js';

class Reviews extends Component {

    state = {
        key: '',
        review:'',
        modal:false,
        reviews: [],
        sliceTo:'',
        disable:false,
    };

    async componentDidMount() {
        new WOW().init();

        await this.props.fetchReviews();

        const review = this.props.reviews;
        const filterForReviews = review.filter(reviews => reviews.review !== 'No Comment');
        await this.setState({reviews: filterForReviews});
        if (this.state.reviews.length >= 22){
            this.setState({sliceTo: this.props.reviews.length / 12,disable: false});
        }else{
            this.setState({sliceTo: this.state.reviews.length,disable:true});
        }
    }

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
        await this.props.postReviews({key: this.state.key, review: this.state.review});
        if(this.props.postReviewsError){
            toast.error(`${this.props.postReviewsError.error}`);
        }else{
            toast.success('Ваш отзыв оставлен!');
            this.setState({modal: false});
            this.componentDidMount();
        }
    };

    loadMoreHandler =  () => {
        const slice = this.state.sliceTo + 1;
        this.setState({sliceTo: slice});

        if(this.state.sliceTo >= this.state.reviews.length){
            toast.error('Больше отзывав не найдено!');
            this.setState({sliceTo: this.state.reviews.length,disable: true})
        }
    };

    deleteReviewHandler = async (id) => {
        await this.props.deleteReview(id);

        if(this.props.deleteReviewError !== null){
            toast.error(`${this.props.deleteReviewError}`);
        }else {
            toast.dark('Отзыв удален');
            this.componentDidMount()
        }
    };

    render() {
        return (
            <div className="ReviewsContainer">
                <ToastContainer/>
                <button className="leave_reviews" onClick={this.showModal}>оставить отзыв</button>
                {this.props.spinner === true ? (
                    <Spinner/>
                ) : (
                    <div className="all_reviews_container">
                        <Modal show={this.state.modal} close={this.state.modal}>
                            <div className="inputs_for_reviews">
                                <input className="key_input" type="text" placeholder="ваш ключ....." name="key" onChange={this.inputValHandler}/>
                                <textarea className="reviews_input" name="review" onChange={this.inputValHandler} placeholder="Ваш отзыв..."/>
                            </div>
                            <div className="close_or_leave">
                                <button className="close_modal_in_reviews" onClick={this.closeModal}>закрыть</button>
                                <button className="send_reviews" onClick={this.sendReviews}>оставить</button>
                            </div>
                        </Modal>
                            <div className="reviews wow animate__animated animate__fadeInDownBig">
                                {this.state.reviews && Object.keys(this.state.reviews).slice(0,this.state.sliceTo).map(reviews => (
                                    <div className="review_block" key={reviews}>
                                        <h4 className="review_pc_name">Покупатель, {this.state.reviews[reviews].pcName}</h4>
                                        <p className="review_text">{this.state.reviews[reviews].review}</p>
                                        <p className="review_price">Купил за - {this.state.reviews[reviews].price} сом</p>
                                        {this.props.user && (this.props.user.role === 'admin' || this.props.user.role === 'operator') ? (
                                            <button onClick={() => this.deleteReviewHandler(this.state.reviews[reviews]._id)} className="delete_review">удалить</button>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                ))}
                                <button disabled={this.state.disable} className="load_more" onClick={this.loadMoreHandler}>загрузить еще</button>
                            </div>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    postReviewsError: state.postReviewsError.postReviewsError,
    reviews: state.reviews.reviews,
    spinner: state.pc.spinner,
    user: state.user.user,
    deleteReviewError: state.reviews.deleteReviewError,
});

const mapDispatchToProps = dispatch => ({
    postReviews: (reviews) => dispatch(postReviews(reviews)),
    fetchReviews: () => dispatch(fetchReviews()),
    deleteReview: (id) => dispatch(deleteReview(id)),
});

export default connect(mapStateToProps,mapDispatchToProps) (Reviews);