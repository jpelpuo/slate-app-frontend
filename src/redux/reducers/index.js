import { combineReducers } from 'redux';
import userReducer from './userReducer';
import appReducer from './appReducer'
import { connectRouter } from 'connected-react-router';

const reducers = history => combineReducers({
    user: userReducer,
    router: connectRouter(history),
    app: appReducer
});

export default reducers;