import { createStore, combineReducers } from 'redux';
import complaintReducer from './complaintReducer';

const rootReducer = combineReducers({
    complaints: complaintReducer,
});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
