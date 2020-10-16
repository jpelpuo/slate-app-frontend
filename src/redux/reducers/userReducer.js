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
    registeredCourses: JSON.parse(sessionStorage.getItem('registeredCourses')),
    email: sessionStorage.getItem('email'),
    loading: false
}


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_USER_STATE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default userReducer;