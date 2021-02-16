import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ReducerDish } from './dishes';
import { ReducerComment } from './comments';
import { ReducerPromotion } from './promotions';
import { ReducerLeader } from './leaders';
import { ReducerFavorite } from './favorites'

export const ConfigureStore = () => {

    // Persistor configuration
    const config = {
        key: 'root',
        storage: AsyncStorage,
        debug: true
    };

    const store = createStore(
        persistCombineReducers(config, {
            dishes: ReducerDish,
            comments: ReducerComment,
            promotions: ReducerPromotion,
            leaders: ReducerLeader,
            favorites: ReducerFavorite
        }), applyMiddleware(thunk, logger)
    );

    const persistor = persistStore(store);

    return { persistor, store };
}