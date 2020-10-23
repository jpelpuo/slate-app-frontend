import { takeEvery, put, all, call } from 'redux-saga/effects'
import actions from '../actionTypes'
import { setExamState } from '../actions/examActions'
import { toast } from 'react-toastify'
import { addNewExam, getAllExams } from '../../services/exam'
import { push } from 'connected-react-router'

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

export function* getExams() {
    try {
        const accessToken = sessionStorage.getItem('accessToken')

        yield put(setExamState({
            loading: true
        }))

        const response = yield call(getAllExams, accessToken)

        if (response.error) {
            throw response.error
        }

        yield put(setExamState({
            loading: false,
            exams: [...response.exams]
        }))


    } catch (error) {
        yield put(setExamState({
            loading: false
        }))

        toast(error.message, { type: "error" })
    }
}

export function* takeExam({ payload: { examBeingTakenId, examToTake } }) {
    try {
        yield put(setExamState({
            examBeingTakenId,
            examToTake
        }))

        sessionStorage.setItem('examBeingTakenId', examBeingTakenId)
        sessionStorage.setItem('examToTake', JSON.stringify(examToTake))

        yield put(push(`/user/exam/${examBeingTakenId}`))
    } catch (error) {
        toast(error.message, { type: "error" })
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.ADD_EXAM, addExam),
        takeEvery(actions.GET_EXAMS, getExams),
        takeEvery(actions.TAKE_EXAM, takeExam)
    ])
}