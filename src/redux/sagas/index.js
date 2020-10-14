import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import appSaga from './appSaga'

export default function* rootSaga() {
    yield all([userSaga(), appSaga()])
}