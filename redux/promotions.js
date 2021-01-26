import * as ActionTypes from './ActionTypes';

export const ReducerPromotion = (state = {
    isLoading: true,
    errMessage: null,
    promotions: []
}, action) => {
    switch (action.type) {
        case ActionTypes.PROMOS_ADD:
            return {...state, isLoading: false, errMessage: null, promotions: action.payload};
        case ActionTypes.PROMOS_LOADING:
            return {...state, isLoading: true, errMessage: null, promotions: []};
        case ActionTypes.PROMOS_FAILED:
            return {...state, isLoading: false, errMessage: action.payload, promotions: []};
        default:
            return state;
    }
}