import {
    POST_REQUEST_REQUEST,
    POST_REQUEST_ERROR,
    GET_REQUEST_REQUEST,
    GET_REQUEST_SUCCESS, GET_REQUEST_ERROR,
    PUT_REQUEST_REQUEST,PUT_REQUEST_ERROR,
} from "../actions/RequestsActions";

const initialState = {
    postRequestError: null,
    spinner: false,
    requests: {},
    getRequestError: null,
    completedRequestError: null,
};

export const RequestReducer = (state = initialState,action) => {
    switch(action.type) {

        case POST_REQUEST_REQUEST:
          return{...state,spinner: true, postRequestError: null};
        case POST_REQUEST_ERROR:
          return{...state, postRequestError: action.error, spinner: false};

        case GET_REQUEST_REQUEST:
          return{...state, spinner: true, getRequestError: null};
        case GET_REQUEST_SUCCESS:
          return{...state, requests: action.requests, getRequestError: null, spinner: false};
        case GET_REQUEST_ERROR:
          return{...state, spinner: false, getRequestError: action.error};

        case PUT_REQUEST_REQUEST:
            return{...state, spinner: true, completedRequestError: null};
        case PUT_REQUEST_ERROR:
            return{...state,spinner: false, completedRequestError: action.error};

        default:
          return state;
  }
};