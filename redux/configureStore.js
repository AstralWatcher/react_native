import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import {ReducerDish} from './dishes'
import {ReducerComment} from './comments'
import {ReducerPromotion} from './promotions'
import {ReducerLeader} from './leaders'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            ReducerDish,
            ReducerComment,
            ReducerPromotion,
            ReducerLeader
        }), applyMiddleware(thunk,logger)
    );
    
}