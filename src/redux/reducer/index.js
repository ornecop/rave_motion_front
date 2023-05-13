// Events Actions Types
import {
    EVENTS_SEARCH,
    EVENTS_SEARCH_REMOVE,
    EVENTS_GET_ALL,
    EVENT_DETAIL_GET,
    EVENT_DETAIL_REMOVE,
    EVENT_CREATE,
    EVENT_MODIFY,
} from "../actions/eventsActions";

// Filters
import { DATE_FILTER, PRODUCER_FILTER } from "../actions/filtersActions";

// Tickets Actions Types

// User Actions Types
import {
    USERS_SET_SIGN_ERROR,
    USERS_REMOVE_SIGN_ERROR,
    USERS_SIGN_UP_STEP_SET,
} from "../actions/usersActions";

// User Tickets Actions Types

// Initial State
import initialState from "./initialState";

// Root reducer
const rootReducer = (state = initialState, action) => {
    console.log(state);
    switch (action.type) {
        case EVENTS_GET_ALL:
            return {
                ...state,
                allEvents: action.payload,
                homeEvents: action.payload,
            };
        case EVENTS_SEARCH:
            return {
                ...state,
                searchResult: action.payload,
                currentPage: 1,
            };
        case EVENTS_SEARCH_REMOVE:
            return {
                ...state,
                searchResult: [],
            };
        case EVENT_DETAIL_GET:
            return {
                ...state,
                eventDetail: action.payload,
            };
        case EVENT_DETAIL_REMOVE:
            return {
                ...state,
                eventDetail: {},
            };
        case EVENT_CREATE:
            return {
                ...state,
            };
        case EVENT_MODIFY:
            return {
                ...state,
            };
        //* Filtros
        case PRODUCER_FILTER:
            return { ...state, homeEvents: action.payload };
        case DATE_FILTER:
            return { ...state, homeEvents: action.payload };

        // Users
        case USERS_SET_SIGN_ERROR:
            return { ...state, userSignError: action.payload };
        case USERS_REMOVE_SIGN_ERROR:
            return { ...state, userSignError: "" };

        case USERS_SIGN_UP_STEP_SET:
            return { ...state, signUpStep: action.payload };
        //* ----------
        default:
            return { ...state };
    }
};

export default rootReducer;
