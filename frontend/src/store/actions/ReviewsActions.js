import axiosAPI from "../../axiosAPI";

export const POST_REVIEWS_REQUEST = 'POST_REVIEWS_REQUEST';
export const POST_REVIEWS_SUCCESS = 'POST_REVIEWS_SUCCESS';
export const POST_REVIEWS_ERROR = 'POST_REVIEWS_ERROR';

export const postReviewsRequest = (spinner) => ({type: POST_REVIEWS_REQUEST,spinner});
export const postReviewsSuccess = () => ({type: POST_REVIEWS_SUCCESS});
export const postReviewsError = (error) => ({type: POST_REVIEWS_ERROR,error});

export const postReviews = (reviews) => {
    return async (dispatch,getState) => {
        try{
            dispatch(postReviewsRequest());
            const token = getState().user.user;
            const sendReviews = await axiosAPI.post('/reviews',reviews,{headers: {'Authorization': token.token}});
            dispatch(postReviewsSuccess(sendReviews.data));
        } catch(error){
            dispatch(postReviewsError(error.response.data));
        }
    }
};