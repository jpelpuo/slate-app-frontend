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

const getCourses = () => {
    return {
        type: actions.GET_COURSES
    }
}

const setCourses = payload => {
    return {
        type: actions.SET_COURSES,
        payload
    }
}

const setCourseState = payload => {
    return {
        type: actions.SET_COURSE_STATE,
        payload
    }
}

const unregisterCourse = payload => {
    return {
        type: actions.UNREGISTER_COURSE,
        payload
    }
}

const deleteCourse = payload => {
    return {
        type: actions.DELETE_COURSE,
        payload
    }
}

export {
    addCourse,
    registerCourse,
    setCourses,
    getCourses,
    setCourseState,
    deleteCourse,
    unregisterCourse
}