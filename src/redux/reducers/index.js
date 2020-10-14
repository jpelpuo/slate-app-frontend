import { combineReducers } from 'redux';
import userReducer from './userReducer';
import appReducer from './appReducer'
import { connectRouter } from 'connected-react-router';
import courseReducer from './courseReducer';

const reducers = history => combineReducers({
    user: userReducer,
    router: connectRouter(history),
    app: appReducer,
    course: courseReducer
});

export default reducers;