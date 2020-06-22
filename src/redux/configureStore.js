import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Dishes } from './dishes';
import { Promotions } from './promotions';
import { Comments } from './comments';
import { Leaders } from './leaders';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms';

export const ConfigureStore=()=>{
    const store=createStore(
        combineReducers({
            //This is our global state here :)
            dishes : Dishes,
            promotions : Promotions,
            leaders : Leaders,
            comments : Comments,
            ...createForms({
                feedback : InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}