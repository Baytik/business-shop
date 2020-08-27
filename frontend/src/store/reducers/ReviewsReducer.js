import {POST_REVIEWS_REQUEST,POST_REVIEWS_SUCCESS,POST_REVIEWS_ERROR} from "../actions/ReviewsActions";

const initialState = {
    spinner: false,
    reviewsError: null,
};

const ReviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_REVIEWS_ERROR:
            return{...state,reviewsError: action.error, spinner: false};
        case POST_REVIEWS_REQUEST:
            return{...state, spinner: true, reviewsError: null};
        case POST_REVIEWS_SUCCESS:
            return{...state,spinner: false, reviewsError: null};
        default:
            return state;
    }
};
export default ReviewsReducer;