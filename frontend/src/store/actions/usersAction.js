import axiosAPI from "../../axiosAPI";
import {push} from 'connected-react-router';

export const LOGOUT_USER_ERROR = 'LOGOUT_USER_ERROR';

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';

export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_ERROR = 'ADD_USER_ERROR';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_ERROR = 'DELETE_USER_ERROR';

export const logoutUserError = (error) => ({type: LOGOUT_USER_ERROR, error});

export const loginUserSuccess = (user) => ({type: LOGIN_USER_SUCCESS, user});
export const loginUserError = (error) => ({type: LOGIN_USER_ERROR, error});
export const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});

export const addUserRequest = (spinner) => ({type: ADD_USER_REQUEST,spinner});
export const addUserSuccess = () => ({type: ADD_USER_SUCCESS});
export const addUserError = (error) => ({type: ADD_USER_ERROR,error});

export const getUserRequest = (spinner) => ({type: GET_USER_REQUEST,spinner});
export const getUserSuccess = (usersList) => ({type: GET_USER_SUCCESS,usersList});
export const getUserError = (error) => ({type: GET_USER_ERROR,error});

export const deleteUserRequest = (spinner) =>  ({type: DELETE_USER_REQUEST,spinner});
export const deleteUserSuccess = () =>  ({type: DELETE_USER_SUCCESS});
export const deleteUserError = (error) =>  ({type: DELETE_USER_ERROR,error});

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

export const addUser = (user) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.user;
            dispatch(addUserRequest());
            const add = await axiosAPI.post('/users',user,{headers:{'Authorization': token.token}});
            dispatch(addUserSuccess(add))
        }catch (error) {
            dispatch(addUserError(error.response.statusText));
        }
    }
};

export const fetchUser = () => {
  return async (dispatch,getState) => {
      try{
          const token = getState().user.user;
          dispatch(getUserRequest());
          const user = await axiosAPI.get('/users',{headers:{'Authorization': token.token}});
          dispatch(getUserSuccess(user.data));
      }catch(error) {
          dispatch(getUserError(error.response.data));
      }
  }
};

export const deleteUser = (id) => {
    return async (dispatch,getState) => {
        try {
            const token = getState().user.user;
            dispatch(deleteUserRequest());
            await axiosAPI.delete(`/users/${id}`,{headers: {'Authorization': token.token}});
            dispatch(deleteUserSuccess());
        } catch(error){
            dispatch(deleteUserError(error.response.statusText))
        }
    }
};