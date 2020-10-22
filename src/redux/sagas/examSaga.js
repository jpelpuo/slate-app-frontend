import { takeEvery, put, all, call, delay } from 'redux-saga/effects'
import actions from '../actionTypes'
import { setExamState } from '../actions/examActions'
import { toast } from 'react-toastify'
import { addNewExam } from '../../services/exam'

export function* addExam({ payload }) {
    try {
        const accessToken = sessionStorage.getItem('accessToken')

        yield put(setExamState({
            loading: true
        }))

        const response = yield call(addNewExam, payload, accessToken)

        if (response.error) {
            throw response.error
        }

        toast("Exam Added", { type: "success" })
        yield put(setExamState({
            loading: false
        }))

    } catch (error) {
        yield put(setExamState({
            loading: false
        }))

        yield toast(error.message, { type: "error" })
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.ADD_EXAM, addExam)
    ])
}