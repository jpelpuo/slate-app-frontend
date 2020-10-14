import actions from '../actionTypes';

const addCourse = payload => {
    return {
        type: actions.ADD_COURSE,
        payload
    }
}

const registerCourse = payload => {
    return {
        type: actions.REGISTER_COURSE,
        payload
    }
}

const setState = payload => {
    return {
        type: actions.SET_STATE,
        payload
    }
}

export {
    addCourse,
    registerCourse,
    setState
}