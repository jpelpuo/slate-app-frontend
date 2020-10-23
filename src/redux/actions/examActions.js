import actions from '../actionTypes';

const addExam = payload => {
    return {
        type: actions.ADD_EXAM,
        payload
    }
}

const getExams = () => {
    return {
        type: actions.GET_EXAMS
    }
}

const takeExam = payload => {
    return {
        type: actions.TAKE_EXAM,
        payload
    }
}

const setExamState = payload => {
    return {
        type: actions.SET_EXAM_STATE,
        payload
    }
}

export {
    addExam,
    setExamState,
    getExams,
    takeExam
}