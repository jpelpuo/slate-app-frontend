import { takeEvery, put, all, call, delay } from 'redux-saga/effects';
import actions from '../actionTypes';
import { setCourses, setState } from '../actions/courseActions';
import {
    addCourse as addNewCourse,
    getCourses as getAllCourses,
    deleteOneCourse
} from '../../services/course';
import { toast } from 'react-toastify';

const accessToken = sessionStorage.getItem('accessToken')

export function* addCourse({ payload: { courseName, subject, description } }) {
    try {
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

export default function* rootSaga() {
    yield all([
        takeEvery(actions.ADD_COURSE, addCourse),
        takeEvery(actions.GET_COURSES, getCourses),
        takeEvery(actions.DELETE_COURSE, deleteCourse)
    ])
}