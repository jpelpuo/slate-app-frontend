import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import appSaga from './appSaga';
import courseSaga from './courseSaga';

export default function* rootSaga() {
    yield all([userSaga(), appSaga(), courseSaga()])
}