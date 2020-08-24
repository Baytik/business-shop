import {POST_PC_REQUEST,POST_PC_ERROR,POST_PC_SUCCESS,GET_PC_SUCCESS,GET_PC_REQUEST} from "../actions/pcAction";

const initialState = {
    computers:{},
    spinner:false,
    postPcError: null,
    computer:{},
};

export const pcReducer = (state = initialState , action) => {
    switch(action.type) {
        case POST_PC_REQUEST:
            return{...state, spinner: true , postPC: null};
        case POST_PC_SUCCESS:
            return{...state, computer: action.computer , spinner: false , postPC: null};
        case POST_PC_ERROR:
            return{...state, postPcError: action.error , spinner: false};
        case GET_PC_REQUEST:
            return{...state, spinner: true};
        case GET_PC_SUCCESS:
            return{...state, computers: action.computers , spinner: false};
        default:
            return state;
    }
};
