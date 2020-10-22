import { combineReducers } from 'redux';
import userReducer from './userReducer';
import appReducer from './appReducer'
import { connectRouter } from 'connected-react-router';
import courseReducer from './courseReducer';
import examReducer from './examReducer'

const reducers = history => combineReducers({
    router: connectRouter(history),
    user: userReducer,
    app: appReducer,
    course: courseReducer,
    exam: examReducer
});

export default reducers;