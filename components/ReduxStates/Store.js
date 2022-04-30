import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import coinsReducer from './Reducers';

export const store = createStore(coinsReducer);

// const rootReducer = combineReducers({coinsReducer});

// export const store = createStore(rootReducer, applyMiddleware(thunk));
