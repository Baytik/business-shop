import React, {Component} from 'react';
import {fetchReviewsKeys} from "../../store/actions/ReviewsActions";
import {connect} from 'react-redux';
import Spinner from "../../Components/UI/Spinner/Spinner";
import './NotFeedBackReviews.css';
import './MediaNotFeedbackReviews.css';

class NotFeedbackReviews extends Component {

    state = {
        reviewsKeys:[],
        emptyText: false,
    };

     componentDidMount() {
        this.props.fetchReviewsKeys();
        const interval = setTimeout(this.keysHandler,100);

        if(this.state.reviewsKeys.length > 0 ){
            clearTimeout(interval);
        }
    }

    keysHandler = () => {
        if(this.props.user && this.props.user.role === 'admin'){
            const keys = this.props.reviewsKeys;

            const filterKeys = keys.filter(key => key.review === 'No Comment');
            if(filterKeys === null || filterKeys === undefined){
                this.setState({emptyText: true});
            }else {
                this.setState({reviewsKeys: filterKeys});
            }
        }else {
            this.props.history.push('/computers')
        }
    };

    render() {
        if(this.props.user && (this.props.user.role !== 'admin')){
            this.props.history.push('/computers');
        }else if(! this.props.user){
            this.props.history.push('/computers');
        }
        return (
            <div className="NotFeedbackContainer">
                {this.props.spinner === true ? (
                    <Spinner/>
                ) : (
                    <div className="reviewsKeysTables">
                        <h3 className="title_reviewsKeys">Все проданные компьютеры с не оставленными отзывами</h3>
                        <table>
                            {this.state.reviewsKeys && Object.keys(this.state.reviewsKeys).map(keys => (
                                <tbody key={keys}>
                                    <tr>
                                        <td>Название: {this.state.reviewsKeys[keys].pcName}</td>
                                        <td>Цена: {this.state.reviewsKeys[keys].price}</td>
                                        <td>Скидка: {this.state.reviewsKeys[keys].rebate}</td>
                                        <td>Ключ: {this.state.reviewsKeys[keys].key}</td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    reviewsKeys: state.reviewsKeys.reviewsKeys,
    spinner: state.pc.spinner,
    user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
    fetchReviewsKeys: () => dispatch(fetchReviewsKeys()),
});

export default connect(mapStateToProps,mapDispatchToProps)(NotFeedbackReviews);