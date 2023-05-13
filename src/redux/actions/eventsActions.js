import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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
        const events = (await axios.get(`http://localhost:3001/events`)).data;
        dispatch({ type: EVENTS_GET_ALL, payload: events });
    };
};

export const getEventsByName = (name) => {
    return async function (dispatch) {
        const response = await axios.get(
            `${BACKEND_URL}/events/name?name=${name}`
        );
        const eventsByName = response.data;
        dispatch({ type: EVENTS_SEARCH, payload: eventsByName });
    };
};

export const removeEventByName = () => {
    return {
        type: EVENTS_SEARCH_REMOVE,
    };
};

export const getEventById = (id) => {
    return async function (dispatch) {
        const response = await axios.get(`http://localhost:3001/events/${id}`);
        const eventDetail = response.data;
        dispatch({
            type: EVENT_DETAIL_GET,
            payload: eventDetail,
        });
    };
};

export const removeEventDetail = () => {
    return {
        type: EVENT_DETAIL_REMOVE,
    };
};

// Responde con evento sin tickets
export const createEvent = (eventData) => {
    return async (dispatch) => {
        const response = await axios.post(
            `${BACKEND_URL}/events/eventcreate`,
            eventData
        );
        const eventCreated = response.data;
        dispatch({
            type: EVENT_CREATE,
            payload: eventCreated,
        });
    };
};

export const modifyEvent = (id, eventData) => {
    return async (dispatch) => {
        const response = await axios.put(
            `${BACKEND_URL}/events/${id}`,
            eventData
        );
        const eventActualiced = response.data;
        dispatch({
            type: EVENT_MODIFY,
            payload: eventActualiced,
        });
    };
};
