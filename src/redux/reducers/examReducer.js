import actions from "../actionTypes";

const initialState = {
    examAdded: false,
    exams: [],
    examDeleted: false,
    loading: false,
    examToAdd: "",
    examToRemove: ""
}

const examReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_EXAM_STATE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default examReducer