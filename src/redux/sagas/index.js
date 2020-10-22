import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import appSaga from './appSaga';
import courseSaga from './courseSaga';
import examSaga from './examSaga'

export default function* rootSaga() {
    yield all([userSaga(), appSaga(), courseSaga(), examSaga()])
}