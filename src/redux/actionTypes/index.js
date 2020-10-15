const actions = {
    // Authentication actions
    USER_LOGIN: "user/USER_LOGIN",
    ADMIN_LOGIN: "admin/ADMIN_LOGIN",
    LOGOUT: "LOGOUT",
    TAKE_PICTURE: "user/TAKE_PICTURE",
    SAVE_PICTURE: "user/SAVE_PICTURE",

    // Register actions
    REGISTER: "user/REGISTER",

    // App actions
    SET_STATE: "SET_STATE",
    TOGGLE_NAV: "TOGGLE_NAV",

    // Course actions
    ADD_COURSE: "admin/ADD_COURSE",
    REGISTER_COURSE: "user/REGISTER_COURSE",
    GET_COURSES: "admin/GET_COURSES",
    SET_COURSES: "admin/SET_COURSES",
    DELETE_COURSE: "admin/DELETE_COURSE"
}


export default actions;