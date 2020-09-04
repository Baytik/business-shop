import axiosAPI from "../../axiosAPI";

export const POST_REVIEWS_REQUEST = 'POST_REVIEWS_REQUEST';
export const POST_REVIEWS_SUCCESS = 'POST_REVIEWS_SUCCESS';
export const POST_REVIEWS_ERROR = 'POST_REVIEWS_ERROR';

export const GET_REVIEWS_REQUEST = 'GET_REVIEWS_REQUEST';
export const GET_REVIEWS_SUCCESS = 'GET_REVIEWS_SUCCESS';
export const GET_REVIEWS_ERROR = 'GET_REVIEWS_ERROR';

export const GET_REVIEWS_KEYS_REQUEST = 'GET_REVIEWS_KEYS_REQUEST';
export const GET_REVIEWS_KEYS_SUCCESS = 'GET_REVIEWS_KEYS_SUCCESS';
export const GET_REVIEWS_KEYS_ERROR = 'GET_REVIEWS_KEYS_ERROR';

export const DELETE_REVIEWS_REQUEST = 'DELETE_REVIEWS_REQUEST';
export const DELETE_REVIEWS_SUCCESS = 'DELETE_REVIEWS_SUCCESS';
export const DELETE_REVIEWS_ERROR = 'DELETE_REVIEWS_ERROR';

export const postReviewsRequest = (spinner) => ({type: POST_REVIEWS_REQUEST,spinner});
export const postReviewsSuccess = () => ({type: POST_REVIEWS_SUCCESS});
export const postReviewsError = (error) => ({type: POST_REVIEWS_ERROR,error});

export const getReviewsRequest = (spinner) => ({type: GET_REVIEWS_REQUEST,spinner});
export const getReviewsSuccess = (reviews) => ({type: GET_REVIEWS_SUCCESS,reviews});
export const getReviewsError = (error) => ({type: GET_REVIEWS_ERROR,error});

export const getReviewsKeysRequest = (spinner) => ({type: GET_REVIEWS_KEYS_REQUEST,spinner});
export const getReviewsKeysSuccess = (reviewsKeys) => ({type: GET_REVIEWS_KEYS_SUCCESS,reviewsKeys});
export const getReviewsKeysError = (error) => ({type: GET_REVIEWS_KEYS_SUCCESS,error});

export const deleteReviewsRequest = (spinner) => ({type: DELETE_REVIEWS_REQUEST,spinner});
export const deleteReviewsSuccess = () => ({type: DELETE_REVIEWS_SUCCESS});
export const deleteReviewsError = (error) => ({type: DELETE_REVIEWS_ERROR,error});

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

export const fetchReviewsKeys = () => {
    return async (dispatch,getState) => {
        try{
            const token = getState().user.user;
            dispatch(getReviewsKeysRequest());
            const reviewsKeys = await axiosAPI.get('/reviews/keys',{headers:{'Authorization': token.token}});
            dispatch(getReviewsKeysSuccess(reviewsKeys.data));
        }catch(error){
            dispatch(getReviewsKeysError(error))
        }
    }
};

export const deleteReview = (id) => {
  return async (dispatch,getState) => {
      try{
          const token = getState().user.user;
          dispatch(deleteReviewsRequest());
          const deleteReview = await axiosAPI.delete(`/reviews/${id}`,{headers: {'Authorization': token.token}});
          dispatch(deleteReviewsSuccess(deleteReview));
      } catch(error){
          dispatch(deleteReviewsError(error.response.statusText));
      }
  }
};