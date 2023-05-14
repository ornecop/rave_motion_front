const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// ============= Users Actions Types

export const USER_SIGN_IN = "USER_SIGN_IN";
export const USER_SIGN_OUT = "USER_SIGN_OUT";
export const USERS_SET_SIGN_ERROR = "USERS_SET_SIGN_ERROR";
export const USERS_REMOVE_SIGN_ERROR = "USERS_REMOVE_SIGN_ERROR";
export const USERS_SIGN_UP_STEP_SET = "USERS_SIGN_UP_STEP_SET";

// ============= Actions Creators

export const signIn = ({ mail, password }) => {
    return async (dispatch) => {
        try {
            const response = await axios.post("/users/signin", {
                mail,
                password,
            });
            const user = response.data;
            console.log(user);
            return {
                type: USER_SIGN_IN,
                payload: user,
            };
        } catch (error) {
            return {
                type: USERS_SET_SIGN_ERROR,
                payload: error.response.data.error,
            };
        }
    };
};

export const setSignUserError = (error) => {
    return {
        type: USERS_SET_SIGN_ERROR,
        payload: error,
    };
};

export const removeSignUserError = () => {
    return {
        type: USERS_REMOVE_SIGN_ERROR,
    };
};

export const setSignUpStep = (step) => {
    return {
        type: USERS_SIGN_UP_STEP_SET,
        payload: step,
    };
};
