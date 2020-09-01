import React, {Component} from 'react';
import Modal from "../../Components/UI/Modal/Modal";
import {postReviews,fetchReviews} from "../../store/actions/ReviewsActions";
import {connect} from "react-redux";
import {toast,ToastContainer} from "react-toastify";
import './Reviews.css';
import './MediReviews.css';

const mapStateToProps = state => ({
    postReviewsError: state.postReviewsError.postReviewsError,
    reviews: state.reviews.reviews,
});

const mapDispatchToProps = dispatch => ({
    postReviews: (reviews) => dispatch(postReviews(reviews)),
    fetchReviews: () => dispatch(fetchReviews()),
});

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
        await this.props.fetchReviews();

        const review = this.props.reviews;
        const filterForReviews = review.filter(reviews => reviews.review !== 'No Comment');
        await this.setState({reviews: filterForReviews});
        if (this.state.reviews.length >= 16){
            this.setState({sliceTo: this.props.reviews.length / 4,disable: false});
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

    render() {
        return (
            <div className="ReviewsContainer">
                <ToastContainer/>
                <button className="leave_reviews" onClick={this.showModal}>оставить отзыв</button>
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
                <div className="reviews">
                    {this.state.reviews && Object.keys(this.state.reviews).slice(0,this.state.sliceTo).map(reviews => (
                        <div className="review_block" key={reviews}>
                            <h4 className="review_pc_name">Покупатель, {this.state.reviews[reviews].pcName}</h4>
                            <p className="review_text">{this.state.reviews[reviews].review}</p>
                            <p className="review_price">Купил за - {this.state.reviews[reviews].price} сом</p>
                        </div>
                    ))}
                    <button disabled={this.state.disable} className="load_more" onClick={this.loadMoreHandler}>загрузить еще</button>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Reviews);