import {POST_PC_REQUEST,POST_PC_ERROR,POST_PC_SUCCESS,
        GET_PC_SUCCESS,GET_PC_REQUEST,GET_PC_ERROR,
        GET_PC_DETAILS_REQUEST,GET_PC_DETAILS_SUCCESS,GET_PC_DETAILS_ERROR,
        POST_ID_REQUEST,POST_ID_SUCCESS,POST_ID_ERROR,
        GET_ID_REQUEST,GET_ID_SUCCESS,GET_ID_ERROR,
        PUT_PC_REQUEST,PUT_PC_SUCCESS,PUT_PC_ERROR
} from "../actions/pcAction";

const initialState = {
    computers:{},
    computer:{},
    keyForComment: {},
    computerId:{},
    idError:null,
    spinner: false,
    getPcError:null,
    detailsPc: null,
    postPcError: null,
    getPcDetailsError: null,
    keyForCommentError:null,
    putPcError: null,
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
        case GET_PC_ERROR:
            return{...state, getPcError: action.error,spinner: false};

        case GET_PC_DETAILS_REQUEST:
            return{...state, spinner: true};
        case GET_PC_DETAILS_SUCCESS:
            return{...state, detailsPc: action.detailsPc, spinner: false};
        case GET_PC_DETAILS_ERROR:
            return{...state, getPcDetailsError: action.error, spinner: false};

        case POST_ID_REQUEST:
            return{...state, spinner: true};
        case POST_ID_SUCCESS:
            return{...state, keyForComment: action.keyForComment,spinner: false};
        case POST_ID_ERROR:
            return{...state, keyForCommentError: action.error, spinner: false};

        case GET_ID_REQUEST:
            return{...state, spinner: false, idError: null};
        case GET_ID_SUCCESS:
            return{...state, computerId: action.computerId , spinner: false , idError: null};
        case GET_ID_ERROR:
            return{...state, idError: action.error , spinner: false};

        case PUT_PC_REQUEST:
            return{...state, spinner: false, putPcError: null};
        case PUT_PC_SUCCESS:
            return{...state, spinner: false , putPcError: null};
        case PUT_PC_ERROR:
            return{...state, putPcError: action.error , spinner: false};

        default:
            return state;
    }
};
