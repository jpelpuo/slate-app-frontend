import actions from '../actionTypes';

const toggleNav = (payload) => {
    return {
        type: actions.TOGGLE_NAV,
        payload
    }
}

const setAppState = payload => {
    return {
        type: actions.SET_APP_STATE,
        payload
    }
}

export {
    toggleNav,
    setAppState
}