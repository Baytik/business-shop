import axiosAPI from "../../axiosAPI";

export const POST_PC_REQUEST = 'POST_PC_REQUEST';
export const POST_PC_SUCCESS = 'POST_PC_SUCCESS';
export const POST_PC_ERROR = 'POST_PC_ERROR';

export const postPcRequest = (spinner) => ({type: POST_PC_REQUEST, spinner});
export const postPcSuccess = () => ({type: POST_PC_SUCCESS});
export const postPcError = () => ({type: POST_PC_ERROR});

export const sendPc = (computer) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.user;
            dispatch(postPcRequest());
            const send = await axiosAPI.post('/computers', computer, {headers: {'Authorization': token.token}});
            dispatch(postPcSuccess(send))
        } catch(error) {
            dispatch(postPcError(error))
        }
    }
};