import { createStore } from 'redux';
import {initialState, Reducer} from './reducer';

export const ConfigureStore=()=>{
    const store=createStore(initialState, Reducer);
    return store;
}