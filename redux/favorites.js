import * as ActionTypes from './ActionTypes';

export const ReducerFavorite = (state=[], action) => {
    switch (action.type) {
        case ActionTypes.FAVORITES_ADD:
            if(state.some(el=> el === action.payload))
                return state;
            else 
                return state.concat(action.payload);
        default:
            return state;
    }
}