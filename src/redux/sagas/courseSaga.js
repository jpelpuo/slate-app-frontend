import { takeEvery, put, all, call } from 'redux-saga/effects';
import actions from '../actionTypes';
import { setState } from '../actions/courseActions';
import { addCourse as addNewCourse } from '../../services/course';
import { toast } from 'react-toastify'

export function* addCourse({ payload: { courseName, subject, description } }) {
    try {
        yield put(setState({
            loading: true
        }))

        console.log(courseName)
        const accessToken = sessionStorage.getItem('accessToken')

        const response = yield call(addNewCourse, courseName, subject, description, accessToken);

        console.log(response)

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

export default function* rootSaga() {
    yield all([
        takeEvery(actions.ADD_COURSE, addCourse)
    ])
}