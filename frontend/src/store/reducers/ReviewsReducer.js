import {
    POST_REVIEWS_REQUEST,POST_REVIEWS_SUCCESS,POST_REVIEWS_ERROR,
    GET_REVIEWS_REQUEST,GET_REVIEWS_SUCCESS,GET_REVIEWS_ERROR,
    GET_REVIEWS_KEYS_REQUEST,GET_REVIEWS_KEYS_SUCCESS,GET_REVIEWS_KEYS_ERROR
} from "../actions/ReviewsActions";

const initialState = {
    spinner: false,
    postReviewsError: null,
    reviews:{},
    fetchReviewsError:null,
    reviewsKeys:{},
    reviewsKeysError: null,
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

        case GET_REVIEWS_KEYS_REQUEST:
            return{...state, spinner: true, reviewsKeysError: null};
        case GET_REVIEWS_KEYS_SUCCESS:
            return{...state, reviewsKeys: action.reviewsKeys, reviewsKeysError: null};
        case GET_REVIEWS_KEYS_ERROR:
            return{...state, reviewsKeysError: true, spinner: false};

        default:
            return state;
    }
};
export default ReviewsReducer;