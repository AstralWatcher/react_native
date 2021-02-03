import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import {ReducerDish} from './dishes';
import {ReducerComment} from './comments';
import {ReducerPromotion} from './promotions';
import {ReducerLeader} from './leaders';
import {ReducerFavorite} from './favorites'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: ReducerDish,
            comments: ReducerComment,
            promotions: ReducerPromotion,
            leaders: ReducerLeader,
            favorites: ReducerFavorite
        }), applyMiddleware(thunk,logger)
    );

    return store;
}