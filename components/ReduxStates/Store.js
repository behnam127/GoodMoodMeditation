import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import coinsReducer from './Reducers';
import nameReducer from './nameReducer'
// export const store = createStore(coinsReducer);

const rootReducer = combineReducers({coinsReducer,nameReducer});

export const store = createStore(rootReducer, applyMiddleware(thunk));
