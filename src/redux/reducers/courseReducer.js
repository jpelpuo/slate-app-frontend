import actions from "../actionTypes";

const initialState = {
    courseAdded: false,
    courses: []
}

const courseReducer = (state = initialState, action) => {
    switch (action) {
        case actions.SET_STATE:
            return { ...state, ...action.payload }
        default:
            return state
    }
}

export default courseReducer;