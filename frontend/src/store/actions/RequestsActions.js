import axiosAPI from "../../axiosAPI";

export const POST_REQUEST_REQUEST = 'POST_REQUEST_REQUEST';
export const POST_REQUEST_SUCCESS = 'POST_REQUEST_SUCCESS';
export const POST_REQUEST_ERROR = 'POST_REQUEST_ERROR';

export const GET_REQUEST_REQUEST = 'GET_REQUEST_REQUEST';
export const GET_REQUEST_SUCCESS = 'GET_REQUEST_SUCCESS';
export const GET_REQUEST_ERROR = 'GET_REQUEST_ERROR';

export const PUT_REQUEST_REQUEST = 'PUT_REQUEST_REQUEST';
export const PUT_REQUEST_SUCCESS = 'PUT_REQUEST_SUCCESS';
export const PUT_REQUEST_ERROR = 'PUT_REQUEST_ERROR';

export const postRequestRequest = (spinner) => ({type: POST_REQUEST_REQUEST,spinner});
export const postRequestSuccess = (requests) => ({type: POST_REQUEST_SUCCESS,requests});
export const postRequestError = (error) => ({type: POST_REQUEST_ERROR,error});

export const getRequestRequest = (spinner) => ({type: GET_REQUEST_REQUEST,spinner});
export const getRequestSuccess = (requests) => ({type: GET_REQUEST_SUCCESS,requests});
export const getRequestError = (error) => ({type: GET_REQUEST_ERROR,error});

export const putRequestRequest = (spinner) => ({type: PUT_REQUEST_REQUEST,spinner});
export const putRequestSuccess = () => ({type: PUT_REQUEST_SUCCESS});
export const putRequestError = (error) => ({type: PUT_REQUEST_ERROR,error});


export const sendRequest = (request) => {
    return async dispatch => {
        try{
            dispatch(postRequestRequest());
            const sendRequest = await axiosAPI.post('/requests',request);
            dispatch(postRequestSuccess(sendRequest.data))
        }catch(error){
            dispatch(postRequestError(error.response.statusText))
        }
    }
};

export const fetchRequests = (url) => {
    return async (dispatch,getState) => {
        try{
            const token = getState().user.user;
            dispatch(getRequestRequest());
            const response = await axiosAPI.get(`${url}`,{headers:{'Authorization': token.token}});
            dispatch(getRequestSuccess(response.data));
        }catch(error) {
            dispatch(getRequestError(error.response));
        }
    }
};

export const completedRequest = (id) => {
  return async (dispatch,getState) => {
      try{
          const token = getState().user.user;
          dispatch(putRequestRequest());
          const completed = await axiosAPI.put(`/requests/${id}`,{headers:{'Authorization': token.token}});
          dispatch(putRequestSuccess(completed))
      }catch(error){
          dispatch(putRequestError(error.response.statusText));
      }
  }
};