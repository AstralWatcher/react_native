import * as ActionTypes from './ActionTypes';

export const ReducerComment = (state = {
    errMessage: null,
    comments: []
}, action) => {
    switch (action.type) {
        case ActionTypes.COMMENTS_ADD:
            return {...state, errMessage: null, comments: action.payload};
        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMessage: action.payload, comments: []};
        default:
            return state;
    }
}