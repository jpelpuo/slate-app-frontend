import actions from "../actionTypes";

const initialState = {
    accessToken: sessionStorage.getItem('accessToken'),
    firstName: "",
    lastName: "",
    role: sessionStorage.getItem('role'),
    loading: false,
    errorOccurred: false,
    errorMessage: "",
    authenticated: sessionStorage.getItem('authenticated'),
    registrationSuccess: false,
    image: "",
    imageSaved: false,
    userName: "",
    registeredCourses: [],
    email: ""
}


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_STATE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default userReducer;