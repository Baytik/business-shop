import {GET_STATISTICS_REQUEST,GET_STATISTICS_SUCCESS,GET_STATISTICS_ERROR} from "../actions/StatisticsActions";

const initialState = {
    statistics: {},
    spinner: false,
    getStatisticsError: null,
};

export const StatisticsReducer = (state = initialState, action) => {
  switch (action.type) {
      case GET_STATISTICS_REQUEST:
          return{...state, spinner: true, getStatisticsError: null};
      case GET_STATISTICS_SUCCESS:
          return{...state, statistics: action.statistics, spinner: false, getStatisticsError: null};
      case GET_STATISTICS_ERROR:
          return{...state, spinner: false, getStatisticsError: action.error};
      default:
          return state;
  }
};
