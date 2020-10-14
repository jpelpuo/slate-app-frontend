import { takeEvery, put, all } from 'redux-saga/effects';
import actions from '../actionTypes';
import { setState } from '../actions/appActions';

export function* toggleNavigation({ payload }) {
    yield put(setState({
        ...payload
    }))
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.TOGGLE_NAV, toggleNavigation)
    ])
}