import axiosAPI from "../../axiosAPI";

export const GET_STATISTICS_REQUEST = 'GET_ANALYTICS_REQUEST';
export const GET_STATISTICS_SUCCESS = 'GET_ANALYTICS_SUCCESS';
export const GET_STATISTICS_ERROR = 'GET_ANALYTICS_ERROR';

export const getStatisticsRequest = (spinner) => ({type: GET_STATISTICS_REQUEST,spinner});
export const getStatisticsSuccess = (statistics) => ({type: GET_STATISTICS_SUCCESS,statistics});
export const getStatisticsError = (error) => ({type: GET_STATISTICS_ERROR,error});


export const fetchStatistics = () => {
    return async (dispatch,getState) => {
        try {
            const token = getState().user.user;
            dispatch(getStatisticsRequest());
            const statistics = await axiosAPI.get('/analytics',{headers: {'Authorization': token.token}});
            dispatch(getStatisticsSuccess(statistics.data));
        }catch (error) {
            dispatch(getStatisticsError(error.response.statusText));
        }
    }
};