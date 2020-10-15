import actions from "../actionTypes";

const initialState = {
    courseAdded: false,
    courses: [],
    courseDeleted: false
}

const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_STATE:
            return { ...state, ...action.payload }
        case actions.SET_COURSES:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default courseReducer;