import {POST_PC_REQUEST,POST_PC_SUCCESS} from "../actions/pcAction";

const initialState = {
  spinner:false,
};

export const pcReducer = (state = initialState , action) => {
    switch(action.type) {
        case POST_PC_REQUEST:
            return{...state, spinner: true};
        case POST_PC_SUCCESS:
            return{...state, spinner: false};
        default:
            return state;
    }
};
