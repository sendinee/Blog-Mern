import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import userReducer from "./reducers/userReducer";

import thunk from 'redux-thunk';

let reducers = combineReducers({
    user: userReducer,
});

const store = createStore(reducers, compose(applyMiddleware(thunk)));
export default store;
