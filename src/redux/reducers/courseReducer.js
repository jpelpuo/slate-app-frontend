import actions from "../actionTypes";

const initialState = {
    courseAdded: false,
    courses: [],
    courseDeleted: false,
    loading: false,
    courseToAdd: ""
}

const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_COURSE_STATE:
            return { ...state, ...action.payload }
        default:
            return state
    }
}

export default courseReducer;