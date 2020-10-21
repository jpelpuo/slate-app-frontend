import { takeEvery, put, all, call, delay } from 'redux-saga/effects';
import actions from '../actionTypes';
import { setCourseState } from '../actions/courseActions';
import { getUser } from '../../services/user';
import {
    addCourse as addNewCourse,
    getCourses as getAllCourses,
    deleteOneCourse,
    registerForCourse,
    unregisterCourse
} from '../../services/course';
import { setUserState } from '../actions/userActions';
import { toast } from 'react-toastify';

export function* addCourse(action) {
    try {
        const accessToken = sessionStorage.getItem('accessToken')

        yield put(setCourseState({
            loading: true
        }))

        const response = yield call(addNewCourse, action.payload, accessToken);

        if (response.error) {
            throw response.error;
        }

        yield put(setCourseState({
            courseAdded: true,
            loading: false,
        }))

        toast("Course Added", {
            type: "success"
        })

        yield delay(3000)

        yield put(setCourseState({
            courseAdded: false
        }))

    } catch (error) {
        toast(error.message, { type: "error" })
    }
}

export function* getCourses() {
    try {
        yield put(setCourseState({
            loading: true
        }))

        const accessToken = sessionStorage.getItem('accessToken')
        const response = yield call(getAllCourses, accessToken);

        if (response.error) {
            throw response.error;
        }

        yield put(setCourseState({
            loading: false,
            courses: [...response.courses]
        }))

    } catch (error) {
        yield put(setCourseState({
            loading: false
        }))

        toast(error.message, {
            type: "error"
        })
    }
}

export function* deleteCourse({ payload: { courseId } }) {
    try {
        yield put(setCourseState({
            loading: true
        }))

        const accessToken = sessionStorage.getItem('accessToken')
        const response = yield call(deleteOneCourse, courseId, accessToken);

        if (response.error) {
            throw response.error;
        }

        yield put(setCourseState({
            courseDeleted: true,
            loading: false
        }))

        toast("Course deleted", {
            type: "success"
        })

        yield delay(3000)

        yield put(setCourseState({
            courseDeleted: false
        }))

    } catch (error) {
        yield put(setCourseState({
            loading: false
        }))

        toast(error.message, {
            type: "error"
        })
    }
}

export function* registerCourse({ payload: { courseId } }) {
    try {
        yield put(setCourseState({
            loading: true,
            courseToAdd: courseId
        }))

        const accessToken = sessionStorage.getItem('accessToken')

        const response = yield call(registerForCourse, courseId, accessToken);

        if (response.status === 'failure') {
            throw response.status
        }
        const email = sessionStorage.getItem('email');

        const userInfoResponse = yield call(getUser, email, accessToken);

        if (userInfoResponse.error) {
            throw userInfoResponse.error
        }

        yield put(setUserState({
            registeredCourses: [...userInfoResponse.userInfo.registeredCourses]
        }))

        sessionStorage.setItem('registeredCourses', JSON.stringify(userInfoResponse.userInfo.registeredCourses))

        yield put(setCourseState({
            loading: false,
            courseToAdd: ""
        }))

        toast("Course registered", { type: "success" })


    } catch (error) {
        yield put(setCourseState({
            loading: false
        }))

        toast(error, { type: "error" })
    }
}

export function* unregister({ payload: { courseId } }) {
    try {
        yield put(setCourseState({
            loading: true,
            courseToRemove: courseId
        }))

        const accessToken = sessionStorage.getItem('accessToken')

        const response = yield call(unregisterCourse, courseId, accessToken);

        if (response.status === 'failure') {
            throw response.status
        }

        const email = sessionStorage.getItem('email');

        const userInfoResponse = yield call(getUser, email, accessToken);

        if (userInfoResponse.error) {
            throw userInfoResponse.error
        }

        yield put(setUserState({
            registeredCourses: [...userInfoResponse.userInfo.registeredCourses]
        }))

        sessionStorage.setItem('registeredCourses', JSON.stringify(userInfoResponse.userInfo.registeredCourses))

        yield put(setCourseState({
            loading: false,
            courseToRemove: ""
        }))

        toast("Course removed", { type: "success" })

    } catch (error) {
        yield put(setCourseState({
            loading: false
        }))

        toast(error, { type: "error" })
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.ADD_COURSE, addCourse),
        takeEvery(actions.GET_COURSES, getCourses),
        takeEvery(actions.DELETE_COURSE, deleteCourse),
        takeEvery(actions.REGISTER_COURSE, registerCourse),
        takeEvery(actions.UNREGISTER_COURSE, unregister)
    ])
}