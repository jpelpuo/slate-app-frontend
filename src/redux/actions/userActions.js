import actions from '../actionTypes';

const userLogin = payload => {
    return {
        type: actions.USER_LOGIN,
        payload
    }
}

const adminLogin = payload => {
    return {
        type: actions.ADMIN_LOGIN,
        payload
    }
}

const register = payload => {
    return {
        type: actions.REGISTER,
        payload
    }
}

const takePicture = payload => {
    return {
        type: actions.TAKE_PICTURE,
        payload
    }
}

const savePicture = payload => {
    return {
        type: actions.SAVE_PICTURE,
        payload
    }
}


const setUserState = payload => {
    return {
        type: actions.SET_USER_STATE,
        payload
    }
}

const logout = () => {
    return {
        type: actions.LOGOUT
    }
}

export {
    setUserState,
    logout,
    userLogin,
    adminLogin,
    register,
    takePicture,
    savePicture
}