import { takeEvery, put, all } from 'redux-saga/effects';
import actions from '../actionTypes';
import { setAppState } from '../actions/appActions';

export function* toggleNavigation({ payload }) {
    yield put(setAppState({
        ...payload
    }))

    sessionStorage.setItem('navId', payload.navId)
    sessionStorage.setItem('navButtonClicked', payload.navButtonClicked)
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.TOGGLE_NAV, toggleNavigation)
    ])
}