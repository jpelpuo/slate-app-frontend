import actions from "../actionTypes";

const initialState = {
    accessToken: sessionStorage.getItem('accessToken'),
    firstName: sessionStorage.getItem('firstName'),
    lastName: sessionStorage.getItem('lastName'),
    role: sessionStorage.getItem('role'),
    authenticated: sessionStorage.getItem('authenticated'),
    registrationSuccess: false,
    image: "",
    imageSaved: false,
    userName: "",
    registeredCourses: [] || sessionStorage.getItem('registeredCourses'),
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