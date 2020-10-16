import actions from "../actionTypes";

const initialState = {
    navButtonClicked: false || !!sessionStorage.getItem('navButtonClicked'),
    navId: "" || sessionStorage.getItem('navId'),
    navOpen: false,
    loading: false,
    errorOccurred: false,
    errorMessage: "",
}

const appReducer = (state = initialState, action) => {
    switch(action.type){
        case actions.SET_APP_STATE:
            return {
                ...state, 
                ...action.payload
            }
        default:
            return state
    }
}

export default appReducer