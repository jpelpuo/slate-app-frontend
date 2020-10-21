import { takeEvery, call, put, all, delay } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { setUserState } from '../actions/userActions';
import { login, registerUser, saveImage, getUser } from '../../services/user';
import { login as adminAuth } from '../../services/admin'
import actions from '../actionTypes';
import { toast } from 'react-toastify'


// Admin Login Saga
export function* adminLogin(action) {
    try {
        yield put(setUserState({
            loading: true
        }))

        const response = yield call(adminAuth, action.payload);

        if (response.error) {
            throw response.error
        }

        yield put(setUserState({
            loading: false,
            accessToken: response.adminAuth.accessToken,
            authenticated: true,
            errorOccurred: false,
            errorMessage: "",
            role: "admin"
        }))

        yield put(push('/admin/courses'))
        sessionStorage.setItem('accessToken', response.adminAuth.accessToken)
        sessionStorage.setItem('authenticated', true)
        sessionStorage.setItem('role', 'admin')


    } catch (error) {
        yield put(setUserState({
            loading: false
        }))

        yield toast(error.message, {
            type: "error"
        })
    }
}

// User login Saga
export function* userLogin(action) {
    try {
        yield put(setUserState({
            loading: true,
        }))

        const response = yield call(login, action.payload);

        if (response.error) {
            throw response.error
        }

        const userInfoResponse = yield call(getUser, action.payload.email, response.authData.accessToken);

        if (userInfoResponse.error) {
            throw userInfoResponse.error
        }

        yield put(setUserState({
            loading: false,
            accessToken: response.authData.accessToken,
            errorOccurred: false,
            errorMessage: "",
            authenticated: true,
            role: "user",
            firstName: userInfoResponse.userInfo.firstName,
            lastName: userInfoResponse.userInfo.lastName,
            registeredCourses: [...userInfoResponse.userInfo.registeredCourses]
        }))

        yield put(push('/user/home'))
        sessionStorage.setItem('accessToken', response.authData.accessToken)
        sessionStorage.setItem('authenticated', true)
        sessionStorage.setItem('role', 'user')
        sessionStorage.setItem('firstName', userInfoResponse.userInfo.firstName)
        sessionStorage.setItem('lastName', userInfoResponse.userInfo.lastName)
        sessionStorage.setItem('registeredCourses', JSON.stringify(userInfoResponse.userInfo.registeredCourses))
        sessionStorage.setItem('email', action.payload.email)

    } catch (error) {
        yield put(setUserState({
            loading: false
        }))

        yield toast(error.message, {
            type: "error"
        })
    }
}

// Register Saga
export function* register(action) {
    try {
        yield put(setUserState({
            loading: true,
        }))

        const response = yield call(registerUser, action.payload);

        if (response.error) {
            throw response.error
        }

        yield put(setUserState({
            loading: false,
            errorOccurred: false,
            errorMessage: "",
            registrationSuccess: true,
            userName: `${action.payload.firstName} ${action.payload.lastName} ${action.payload.email}`
        }))
        
        yield put(push('/user/picture'))

    } catch (error) {
        yield put(setUserState({
            loading: false
        }))

        yield toast(error.message, {
            type: "error"
        })
    }
}

export function* takePicture({ payload }) {
    yield put(setUserState({
        image: payload
    }))
}

export function* savePicture(action) {
    try {
        yield put(setUserState({
            loading: true,
        }))

        const response = yield call(saveImage, action.payload);

        if (response.error) {
            throw response.error
        }

        yield put(setUserState({
            loading: false,
        }))

        yield toast("Imaged saved... Redirecting to login page", {
            type: "success"
        })

        yield delay(3000)

        yield put(push('/auth'))

    } catch (error) {
        yield put(setUserState({
            loading: false,
        }))

        yield toast(error.message, {
            type: "error"
        })
    }
}

export function* logout() {
    yield put(setUserState({
        authenticated: false,
        accessToken: "",
        loading: false,
        errorOccurred: false,
        errorMessage: "",
        image: "",
        navButtonClicked: false,
        navId: ""
    }))

    sessionStorage.setItem('accessToken', '');
    sessionStorage.setItem('authenticated', false);
    sessionStorage.setItem('navButtonClicked', false)
    sessionStorage.setItem('navId', '')
    sessionStorage.setItem('email', '')
    sessionStorage.setItem('registeredCourses', '')
    sessionStorage.setItem('firstName', '')
    sessionStorage.setItem('lastName', '')

    yield put(push('/auth'))
}


export default function* rootSaga() {
    yield all([
        takeEvery(actions.ADMIN_LOGIN, adminLogin),
        takeEvery(actions.USER_LOGIN, userLogin),
        takeEvery(actions.REGISTER, register),
        takeEvery(actions.TAKE_PICTURE, takePicture),
        takeEvery(actions.SAVE_PICTURE, savePicture),
        takeEvery(actions.LOGOUT, logout)
    ])
}