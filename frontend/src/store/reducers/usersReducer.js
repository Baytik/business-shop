import {
    LOGIN_USER_ERROR, LOGIN_USER_SUCCESS, LOGOUT_USER_SUCCESS,
    ADD_USER_REQUEST, ADD_USER_SUCCESS, ADD_USER_ERROR,
    GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_ERROR,
    DELETE_USER_REQUEST,DELETE_USER_SUCCESS,DELETE_USER_ERROR
} from "../actions/usersAction";

const initialState = {
    user: null,
    loginError: null,
    registerError: null,
    addUserError: null,
    spinner: false,
    getUserError: null,
    usersList: {},
    deleteUserError: null,
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOGIN_USER_SUCCESS:
            return {...state, user: action.user, loginError: null};
        case LOGIN_USER_ERROR:
            return {...state, loginError: action.error};

        case LOGOUT_USER_SUCCESS:
            return {...state, user: null};

        case ADD_USER_REQUEST:
            return{...state, spinner: true, addUserError: null};
        case ADD_USER_SUCCESS:
            return{...state, spinner: false,addUserError: null};
        case ADD_USER_ERROR:
            return{...state, spinner: false, addUserError: action.error};

        case GET_USER_REQUEST:
            return{...state, spinner: true, getUserError: null};
        case GET_USER_SUCCESS:
            return{...state, spinner: false, usersList: action.usersList};
        case GET_USER_ERROR:
            return{...state, spinner: false, getUserError: action.error};

        case DELETE_USER_REQUEST:
            return{...state, spinner: true, deleteUserError: null};
        case DELETE_USER_SUCCESS:
            return{...state, spinner: false, deleteUserError: null};
        case DELETE_USER_ERROR:
            return{...state, spinner: false, deleteUserError: action.error};
        default:
            return state;
    }
};

export default usersReducer;