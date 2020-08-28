import {
    POST_REVIEWS_REQUEST,POST_REVIEWS_SUCCESS,POST_REVIEWS_ERROR,
    GET_REVIEWS_REQUEST,GET_REVIEWS_SUCCESS,GET_REVIEWS_ERROR
} from "../actions/ReviewsActions";

const initialState = {
    spinner: false,
    postReviewsError: null,
    reviews:{},
    fetchReviewsError:null,
};

const ReviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_REVIEWS_ERROR:
            return{...state,postReviewsError: action.error, spinner: false};
        case POST_REVIEWS_REQUEST:
            return{...state, spinner: true, postReviewsError: null};
        case POST_REVIEWS_SUCCESS:
            return{...state,spinner: false, postReviewsError: null};
        case GET_REVIEWS_REQUEST:
            return{...state, spinner: true, fetchReviewsError: null};
        case GET_REVIEWS_SUCCESS:
            return{...state, reviews: action.reviews, fetchReviewsError: null};
        case GET_REVIEWS_ERROR:
            return{...state, fetchReviewsError: action.error};
        default:
            return state;
    }
};
export default ReviewsReducer;