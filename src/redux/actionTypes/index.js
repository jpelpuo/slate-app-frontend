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
    SET_USER_STATE: "user/SET_STATE",
    SET_COURSE_STATE: "course/SET_STATE",
    SET_APP_STATE:"app/SET_STATE",
    TOGGLE_NAV: "TOGGLE_NAV",

    // Course actions
    ADD_COURSE: "admin/ADD_COURSE",
    REGISTER_COURSE: "user/REGISTER_COURSE",
    GET_COURSES: "GET_COURSES",
    SET_COURSES: "admin/SET_COURSES",
    DELETE_COURSE: "admin/DELETE_COURSE",
    UNREGISTER_COURSE: "user/UNREGISTER_COURSE",

    // Exam Actions
    ADD_EXAM: "admin/ADD_EXAM",
    SET_EXAM_STATE: "exam/SET_STATE"
}


export default actions;