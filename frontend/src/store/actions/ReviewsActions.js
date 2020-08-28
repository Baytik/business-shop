import axiosAPI from "../../axiosAPI";

export const POST_REVIEWS_REQUEST = 'POST_REVIEWS_REQUEST';
export const POST_REVIEWS_SUCCESS = 'POST_REVIEWS_SUCCESS';
export const POST_REVIEWS_ERROR = 'POST_REVIEWS_ERROR';

export const GET_REVIEWS_REQUEST = 'GET_REVIEWS_REQUEST';
export const GET_REVIEWS_SUCCESS = 'GET_REVIEWS_SUCCESS';
export const GET_REVIEWS_ERROR = 'GET_REVIEWS_ERROR';

export const postReviewsRequest = (spinner) => ({type: POST_REVIEWS_REQUEST,spinner});
export const postReviewsSuccess = () => ({type: POST_REVIEWS_SUCCESS});
export const postReviewsError = (error) => ({type: POST_REVIEWS_ERROR,error});

export const getReviewsRequest = (spinner) => ({type: GET_REVIEWS_REQUEST,spinner});
export const getReviewsSuccess = (reviews) => ({type: GET_REVIEWS_SUCCESS,reviews});
export const getReviewsError = (error) => ({type: GET_REVIEWS_ERROR,error});

export const postReviews = (reviews) => {
    return async (dispatch) => {
        try{
            dispatch(postReviewsRequest());
            const sendReviews = await axiosAPI.post('/reviews',reviews);
            dispatch(postReviewsSuccess(sendReviews.data));
        } catch(error){
            dispatch(postReviewsError(error.response.data));
        }
    }
};

export const fetchReviews = () => {
    return async dispatch => {
        try {
            dispatch(getReviewsRequest());
            const reviews = await axiosAPI.get('/reviews');
            dispatch(getReviewsSuccess(reviews.data));
        }catch (error) {
            dispatch(getReviewsError(error.response.data))
        }
    }
};