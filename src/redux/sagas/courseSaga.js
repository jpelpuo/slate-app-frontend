import { takeEvery, put, all, call, delay } from 'redux-saga/effects';
import actions from '../actionTypes';
import { setCourses, setState } from '../actions/courseActions';
import {
    addCourse as addNewCourse,
    getCourses as getAllCourses,
    deleteOneCourse,
    registerForCourse
} from '../../services/course';
import { toast } from 'react-toastify';

export function* addCourse({ payload: { courseName, subject, description } }) {
    try {
        const accessToken = sessionStorage.getItem('accessToken')

        yield put(setState({
            loading: true
        }))

        const response = yield call(addNewCourse, courseName, subject, description, accessToken);

        if (response.error) {
            throw response.error;
        }

        yield put(setState({
            courseAdded: true,
            loading: false,
            error: false,
            errorMessage: ""
        }))

        toast("Course Added", {
            type: "success"
        })

    } catch (error) {
        yield put(setState({
            errorOccurred: true,
            errorMessage: error.message
        }))
    }
}

export function* getCourses() {
    try {
        const accessToken = sessionStorage.getItem('accessToken')
        const response = yield call(getAllCourses, accessToken);

        if (response.error) {
            throw response.error;
        }

        yield put(setCourses({
            courses: [...response.courses]
        }))

    } catch (error) {
        toast(error.message, {
            type: "error"
        })
    }
}

export function* deleteCourse({ payload: { courseId } }) {
    try {
        const accessToken = sessionStorage.getItem('accessToken')
        const response = yield call(deleteOneCourse, courseId, accessToken);

        if (response.error) {
            throw response.error;
        }

        yield put(setState({
            courseDeleted: true
        }))

        toast("Course deleted", {
            type: "success"
        })

        yield delay(3000)

        yield put(setState({
            courseDeleted: false
        }))

    } catch (error) {
        toast(error.message, {
            type: "error"
        })
    }
}

export function* registerCourse({ payload: { courseId } }) {
    try {
        const accessToken = sessionStorage.getItem('accessToken')

        yield put(setState({
            loading: true
        }))

        const response = yield call(registerForCourse, courseId, accessToken);

        if (response.status === 'failure') {
            throw response.status
        }

        // if (response.status === 'failure') {
        //     toast("Could not add course", {
        //         type: "error"
        //     })
        // }

        yield put(setState({
            loading: false
        }))

        toast("Course registered", { type: "success" })


    } catch (error) {
        toast(error, { type: "error" })
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.ADD_COURSE, addCourse),
        takeEvery(actions.GET_COURSES, getCourses),
        takeEvery(actions.DELETE_COURSE, deleteCourse),
        takeEvery(actions.REGISTER_COURSE, registerCourse)
    ])
}