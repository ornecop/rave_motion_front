const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import axios from "axios";

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
            const response = await axios.post(
                `${BACKEND_URL}/users/signin`,
                {
                    mail: mail,
                    password: password,
                },
                {
                    withCredentials: true,
                }
            );
            const user = response.data;
            dispatch({
                type: USER_SIGN_IN,
                payload: user,
            });
        } catch (error) {
            dispatch({
                type: USERS_SET_SIGN_ERROR,
                payload: error.response.data.error,
            });
        }
    };
};

export const verifyToken = (token) => {
    console.log(token);
    return async (dispatch) => {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/users/signinsession`,
                {
                    token: token,
                }
            );

            console.log(response);
            const user = response.data;
            dispatch({
                type: USER_SIGN_IN,
                payload: user,
            });
        } catch (error) {
            console.error(error);
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

export const signout = () => {
    return {
        type: USER_SIGN_OUT,
    };
};
