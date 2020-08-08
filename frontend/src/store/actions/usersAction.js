import axiosAPI from "../../axiosAPI";
import {push} from 'connected-react-router';

export const LOGOUT_USER_ERROR = 'LOGOUT_USER_ERROR';

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';

export const logoutUserError = (error) => ({type: LOGOUT_USER_ERROR, error});

export const loginUserSuccess = (user) => ({type: LOGIN_USER_SUCCESS, user});
export const loginUserError = (error) => ({type: LOGIN_USER_ERROR, error});
export const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});

export const loginUser = user => {
    return async (dispatch) => {
        try {
            const response = await axiosAPI.post('/users/sessions', user);
            dispatch(loginUserSuccess(response.data));
            dispatch(push('/computers'));
        } catch (error) {
            dispatch(loginUserError(error.response.data))
        }
    }
};

export const logoutUser = () => {
    return async (dispatch, getState) =>  {
        try {
            const token = getState().user.user;
            await axiosAPI.delete('/users/sessions',{headers: {'Authorization': token.token}});
            dispatch(logoutUserSuccess());
            dispatch(push('/computers'));
        } catch (error) {
            dispatch(logoutUserError(error));
        }
    }
};