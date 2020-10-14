import actions from '../actionTypes';

const toggleNav = (payload) => {
    return {
        type: actions.TOGGLE_NAV,
        payload
    }
}

const setState = payload => {
    return {
        type: actions.SET_STATE,
        payload
    }
}

export {
    toggleNav,
    setState
}