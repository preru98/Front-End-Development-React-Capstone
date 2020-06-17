import { createStore, combineReducers } from 'redux';
import { Dishes } from './dishes';
import { Promotions } from './promotions';
import { Comments } from './comments';
import { Leaders } from './leaders';

export const ConfigureStore=()=>{
    const store=createStore(
        combineReducers({
            //This is our global state here :)
            dishes : Dishes,
            promotions : Promotions,
            leaders : Leaders,
            comments : Comments
        })
    );
    return store;
}