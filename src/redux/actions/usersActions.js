import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// ============= Global Actions Types
import { GLOBAL_ERROR_SET } from "./appActions";

// ============= Users Actions Types
export const USER_SIGN_IN = "USER_SIGN_IN";
export const USER_SIGN_OUT = "USER_SIGN_OUT";
export const USERS_SET_SIGN_ERROR = "USERS_SET_SIGN_ERROR";
export const USERS_REMOVE_SIGN_ERROR = "USERS_REMOVE_SIGN_ERROR";
export const USERS_SIGN_UP_STEP_SET = "USERS_SIGN_UP_STEP_SET";
export const USER_CHANGE_PASSWORD = "USER_CHANGE_PASSWORD";

// ============= User events Actions Types
export const USER_GET_USER_EVENTS_BY_USER_ID = "USER_GET_EVENTS_BY_USER_ID";
export const USER_SET_USER_EVENTS = "USER_SET_USER_EVENTS";
export const USER_REMOVE_USER_EVENTS = "USER_REMOVE_USER_EVENTS";
export const USER_SEARCH_USER_EVENTS = "USER_SEARCH_USER_EVENTS";
export const FILTER_BY_CURRENT="FILTER_BY_CURRENT"

// ============= Actions Creators

export const signIn = ({ email, password }) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/users/signin`, {
                email: email,
                password: password,
            });
            const { user, jwt } = response.data;
            localStorage.setItem("token", jwt);

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
  
export const signInGoogle = (extractedData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/users/logingoogle`,
                extractedData
            );
            const { user, jwt } = response.data;
            localStorage.setItem("tokenGoogle", jwt);
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
    return async (dispatch) => {
        try { 
            const response = await axios.post(
                `${BACKEND_URL}/users/signinsession`,
                {
                    token: token,
                }
            );

            const user = response.data;
            dispatch({
                type: USER_SIGN_IN,
                payload: user,
            });
        } catch (error) {
            dispatch({
                type: GLOBAL_ERROR_SET,
                payload: error.response.data.error,
            });
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

export const signOut = () => {
    localStorage.removeItem("token");
    return {
        type: USER_SIGN_OUT,
    };
};

export const getUserEventsByUserId = (userId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `${BACKEND_URL}/events/eventbyuserid/${userId}`
            );
            const userEvents = response.data;
            dispatch({
                type: USER_GET_USER_EVENTS_BY_USER_ID,
                payload: userEvents,
            });
        } catch (error) {
            dispatch({
                type: GLOBAL_ERROR_SET,
                payload: error.response.data.error,
            });
        }
    };
};

export const setUserEvents = () => {
    return {
        type: USER_SET_USER_EVENTS,
    };
};

export const removeUserEvents = () => {
    return {
        type: USER_REMOVE_USER_EVENTS,
    };
};

export const searchUserEvents = (name) => {
    return {
        type: USER_SEARCH_USER_EVENTS,
        payload: name,
    };
};

export const filterEventsByCurrent=(filter)=>{
    return{
        type: FILTER_BY_CURRENT,
        payload: filter
    }
}
