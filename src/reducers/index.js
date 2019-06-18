/**
 * this is where you combine all reducers if the is more than one reducers
 */

import {combineReducers} from 'redux';
import {lastestCurrency} from './lastestCurrency';

const rootReducer = combineReducers({
    lastestCurrency,
});

export default rootReducer;
