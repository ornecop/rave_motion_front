import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// ============= Global Action Types
import { GLOBAL_ERROR_SET } from "./appActions";

// ============= Events Actions Types
export const EVENTS_GET_ALL = "EVENTS_GET_ALL";
export const EVENTS_FINALIZED_GET_ALL = "EVENTS_FINALIZED_GET_ALL";
export const EVENTS_SET_HOME_EVENTS = "EVENTS_SET_HOME_EVENTS";

export const EVENTS_SEARCH = "EVENTS_SEARCH";

export const EVENT_DETAIL_GET = "EVENT_DETAIL_GET";
export const EVENT_DETAIL_REMOVE = "EVENT_DETAIL_REMOVE";

export const EVENTS_SET_START_DATE_FILTER_BY_DATE =
    "EVENTS_SET_START_DATE_FILTER_BY_DATE";
export const EVENTS_SET_END_DATE_FILTER_BY_DATE =
    "EVENTS_SET_END_DATE_FILTER_BY_DATE";
export const EVENTS_FILTER_BY_DATE = "EVENTS_FILTER_BY_DATE";

export const EVENTS_FILTER_BY_PRODUCER = "EVENTS_FILTER_BY_PRODUCER";
export const EVENTS_SORT = "EVENTS_SORT";

export const EVENTS_SET_CURRENT_PAGE = "EVENTS_SET_CURRENT_PAGE";

// ============= Events Actions Creators
// Get all events
export const getAllEvents = () => {
    return async function (dispatch) {
        try {
            const events = (await axios.get(`${BACKEND_URL}/events`)).data;
            dispatch({ type: EVENTS_GET_ALL, payload: events });
        } catch (error) {
            dispatch({
                type: GLOBAL_ERROR_SET,
                payload: error.response.data.error,
            });
        }
    };
};
export const getAllEventsFinalized = () => {
    return async function (dispatch) {
        try {
            const events = (await axios.get(`${BACKEND_URL}/events/finalized`))
                .data;
            dispatch({ type: EVENTS_FINALIZED_GET_ALL, payload: events });
        } catch (error) {
            dispatch({
                type: GLOBAL_ERROR_SET,
                payload: error.response.data.error,
            });
        }
    };
};

export const setAllEventsOnHomeEvents = () => {
    return {
        type: EVENTS_SET_HOME_EVENTS,
    };
};

// Search
export const searchEvents = (name) => {
    return { type: EVENTS_SEARCH, payload: name };
};

// Detail
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
                payload: error.response.data.error,
            });
        }
    };
};

export const removeEventDetail = () => {
    return {
        type: EVENT_DETAIL_REMOVE,
    };
};

// Filters & Sort
export const setStartDateToFilter = (startDate) => {
    return {
        type: EVENTS_SET_START_DATE_FILTER_BY_DATE,
        payload: startDate,
    };
};

export const setEndDateToFilter = (endDate) => {
    return {
        type: EVENTS_SET_END_DATE_FILTER_BY_DATE,
        payload: endDate,
    };
};

export const filterEventsByDate = () => {
    return {
        type: EVENTS_FILTER_BY_DATE,
    };
};

export const filterEventsByProducer = (producer) => {
    return {
        type: EVENTS_FILTER_BY_PRODUCER,
        payload: producer,
    };
};

export const sortEvents = (sort) => {
    return {
        type: EVENTS_SORT,
        payload: sort,
    };
};

// Pagination
export const setCurrentPage = (page) => {
    return {
        type: EVENTS_SET_CURRENT_PAGE,
        payload: page,
    };
};
