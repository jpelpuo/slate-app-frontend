import { takeEvery, call, put, all, delay } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { setState } from '../actions/userActions';
import { login, registerUser, saveImage, getUserInfo } from '../../services/user';
import { login as adminAuth } from '../../services/admin'
import actions from '../actionTypes';
import { toast } from 'react-toastify'


// Admin Login Saga
export function* adminLogin({ payload: { email, password } }) {
    try {
        yield put(setState({
            loading: true
        }))

        const response = yield call(adminAuth, email, password);

        if (response.error) {
            throw response.error
        }


        yield put(setState({
            loading: false,
            accessToken: response.adminAuth.accessToken,
            authenticated: true,
            errorOccurred: false,
            errorMessage: "",
            role: "admin"
        }))

        yield put(push('/admin/home'))
        sessionStorage.setItem('accessToken', response.adminAuth.accessToken)
        sessionStorage.setItem('authenticated', true)
        sessionStorage.setItem('role', 'admin')


    } catch (error) {
        yield put(setState({
            // errorOccurred: true,
            // errorMessage: error.message,
            loading: false
        }))

        yield toast(error.message, {
            type: "error"
        })
    }
}

// User login Saga
export function* userLogin({ payload: { email, password } }) {
    try {
        yield put(setState({
            loading: true,
        }))

        const response = yield call(login, email, password);

        if (response.error) {
            throw response.error
        }

        const userInfoResponse = yield call(getUserInfo, email, response.authData.accessToken);

        if (userInfoResponse.error) {
            throw userInfoResponse.error
        }

        yield put(setState({
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
        sessionStorage.setItem('registeredCourses', userInfoResponse.userInfo.registeredCourses)

    } catch (error) {
        yield put(setState({
            // errorOccurred: true,
            // errorMessage: error.message,
            loading: false
        }))

        yield toast(error.message, {
            type: "error"
        })
    }
}

// Register Saga
export function* register({ payload: { firstName, lastName, gender, college, mobile, email, password } }) {
    try {
        yield put(setState({
            loading: true,
        }))

        const response = yield call(registerUser, firstName, lastName, gender, college,
            mobile, email, password);

        if (response.error) {
            throw response.error
        }

        yield put(setState({
            loading: false,
            errorOccurred: false,
            errorMessage: "",
            registrationSuccess: true,
            userName: `${firstName} ${lastName} ${email}`
        }))
        yield put(push('/user/picture'))

    } catch (error) {
        yield put(setState({
            // errorOccurred: true,
            // errorMessage: error.message,
            loading: false,
            // registrationSuccess: false
        }))

        yield toast(error.message, {
            type: "error"
        })
    }
}

export function* takePicture({ payload }) {
    yield put(setState({
        image: payload
    }))
}

export function* savePicture({ payload: { imageBase64, userName } }) {
    try {
        yield put(setState({
            loading: true,
        }))

        const response = yield call(saveImage, imageBase64, userName);

        if (response.error) {
            throw response.error
        }

        yield put(setState({
            loading: false,
        }))

        yield toast("Imaged saved... Redirecting to login page", {
            type: "success"
        })

        yield delay(3000)

        yield put(push('/auth'))

    } catch (error) {
        yield put(setState({
            loading: false,
        }))

        yield toast(error.message, {
            type: "error"
        })
    }
}

export function* logout() {
    yield put(setState({
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