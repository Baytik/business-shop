import axiosAPI from "../../axiosAPI";
import {push} from 'connected-react-router';

export const POST_PC_REQUEST = 'POST_PC_REQUEST';
export const POST_PC_SUCCESS = 'POST_PC_SUCCESS';
export const POST_PC_ERROR = 'POST_PC_ERROR';

export const GET_PC_REQUEST = 'GET_PC_REQUEST';
export const GET_PC_SUCCESS = 'GET_PC_SUCCESS';
export const GET_PC_ERROR = 'GET_PC_ERROR';

export const GET_PC_DETAILS_REQUEST = 'GET_PC_DETAILS_REQUEST';
export const GET_PC_DETAILS_SUCCESS = 'GET_PC_DETAILS_SUCCESS';
export const GET_PC_DETAILS_ERROR = 'GET_PC_DETAILS_ERROR';

export const DELETE_PC_SUCCESS = 'DELETE_PC_SUCCESS';
export const DELETE_PC_ERROR = 'DELETE_PC_ERROR';

export const POST_ID_REQUEST = 'POST_ID_REQUEST';
export const POST_ID_SUCCESS = 'POST_ID_SUCCESS';
export const POST_ID_ERROR = 'POST_ID_ERROR';

export const postPcRequest = (spinner) => ({type: POST_PC_REQUEST, spinner});
export const postPcSuccess = (computer) => ({type: POST_PC_SUCCESS,computer});
export const postPcError = (error) => ({type: POST_PC_ERROR,error});

export const getPcRequest = (spinner) => ({type: GET_PC_REQUEST,spinner});
export const getPcSuccess = (computers) => ({type: GET_PC_SUCCESS,computers});
export const getPcError = (error) => ({type: GET_PC_ERROR,error});

export const deletePcSuccess = () => ({type: DELETE_PC_SUCCESS});
export const deletePcError = (error) => ({type: DELETE_PC_ERROR,error});

export const getPcDetailsRequest = (spinner) => ({type: GET_PC_DETAILS_REQUEST,spinner});
export const getPcDetailsSuccess = (detailsPc) => ({type: GET_PC_DETAILS_SUCCESS,detailsPc});
export const getPcDetailsError = (error) => ({type: GET_PC_DETAILS_ERROR,error});

export const postIdRequest = (spinner) => ({type: POST_ID_REQUEST,spinner});
export const postIdSuccess = (keyForComment) => ({type: POST_ID_SUCCESS,keyForComment});
export const postIdError = (error) => ({type: POST_ID_ERROR,error});


export const sendPc = (computer) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.user;
            dispatch(postPcRequest());
            const send = await axiosAPI.post('/computers', computer, {headers: {'Authorization': token.token}});
            dispatch(postPcSuccess(send.data));
        } catch(error) {
            dispatch(postPcError(error.response.data))
        }
    }
};

export const fetchPc = (url) => {
    return async dispatch => {
        try {
            dispatch(getPcRequest());
            const response = await axiosAPI.get(`${url}`);
            dispatch(getPcSuccess(response.data));
        }catch (error) {
            dispatch(getPcError(error));
        }
    }
};

export const fetchPcForDetails = (id) => {
    return async dispatch => {
        try {
            dispatch(getPcDetailsRequest());
            const response = await axiosAPI.get(`/computers/${id}`);
            dispatch(getPcDetailsSuccess(response.data));
        }catch (error) {
            dispatch(getPcDetailsError(error));
        }
    }
};

export const deletePC = (id) => {
  return async (dispatch,getState) => {
      try {
          const token = getState().user.user;
          const deleteComp = await axiosAPI.delete(`/computers/${id}`,{headers: {'Authorization': token.token}});
          dispatch(deletePcSuccess(deleteComp));
      } catch(error) {
          dispatch(deletePcError(error))
      }
  }
};

export const postIdForSold = (id,rebate) => {
    return async (dispatch, getState) => {
        try {
            dispatch(postIdRequest());
            const token = getState().user.user;
            const sendId = await axiosAPI.put(`/computers/review/${id}`, rebate, {headers: {'Authorization': token.token}});
            dispatch(postIdSuccess(sendId.data));
        } catch (error) {
            dispatch(postIdError(error))
        }
    }
};