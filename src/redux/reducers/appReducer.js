import actions from "../actionTypes";

const initialState = {
    navButtonClicked: false,
    navId: "",
    navOpen: false
}

const appReducer = (state = initialState, action) => {
    switch(action.type){
        case actions.SET_STATE:
            return {
                ...state, 
                ...action.payload
            }
        default:
            return state
    }
}

export default appReducer