import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// ============= Global Action Types
import { GLOBAL_ERROR_SET } from "./appActions";

// ============= Events Actions Types
export const EVENTS_GET_ALL = "EVENTS_GET_ALL";

export const EVENTS_SEARCH = "EVENTS_SEARCH";
export const EVENTS_SEARCH_REMOVE = "EVENTS_SEARCH_REMOVE";

export const EVENT_DETAIL_GET = "EVENT_DETAIL_GET";
export const EVENT_DETAIL_REMOVE = "EVENT_DETAIL_REMOVE";

export const EVENT_CREATE = "EVENT_CREATE";
export const EVENT_MODIFY = "EVENT_MODIFY";

// ============= Events Actions Creators
export const getAllEvents = () => {
    return async function (dispatch) {
        try {
            const events = (await axios.get(`${BACKEND_URL}/events`)).data;
            dispatch({ type: EVENTS_GET_ALL, payload: events });
        } catch (error) {
            dispatch({
                type: GLOBAL_ERROR_SET,
                payload: error.data.response.error,
            });
        }
    };
};

export const getEventsByName = (name) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(
                `${BACKEND_URL}/events/name?name=${name}`
            );
            const eventsByName = response.data;
            dispatch({ type: EVENTS_SEARCH, payload: eventsByName });
        } catch (error) {
            dispatch({
                type: GLOBAL_ERROR_SET,
                payload: error.data.response.error,
            });
        }
    };
};

export const removeEventByName = () => {
    return {
        type: EVENTS_SEARCH_REMOVE,
    };
};

export const getEventById = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${BACKEND_URL}/events/${id}`);
            const eventDetail = response.data;
            dispatch({
                type: EVENT_DETAIL_GET,
                payload: eventDetail,
            });
        } catch (error) {
            dispatch({
                type: GLOBAL_ERROR_SET,
                payload: error.data.response.error,
            });
        }
    };
};

export const removeEventDetail = () => {
    return {
        type: EVENT_DETAIL_REMOVE,
    };
};
