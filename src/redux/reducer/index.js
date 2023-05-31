// App Actions Types
import {
    GLOBAL_ERROR_SET,
    GLOBAL_ERROR_REMOVE,
    GLOBAL_SUCCESS_SET,
    GLOBAL_SUCCESS_REMOVE,
} from "../actions/appActions";

// Events Actions Types
import {
    EVENTS_SEARCH,
    EVENTS_GET_ALL,
    EVENT_DETAIL_GET,
    EVENT_DETAIL_REMOVE,
    EVENTS_SET_START_DATE_FILTER_BY_DATE,
    EVENTS_SET_END_DATE_FILTER_BY_DATE,
    EVENTS_FILTER_BY_DATE,
    EVENTS_FILTER_BY_PRODUCER,
    EVENTS_SORT,
    EVENTS_SET_CURRENT_PAGE,
    EVENTS_SET_HOME_EVENTS,
    EVENTS_FINALIZED_GET_ALL,
} from "../actions/eventsActions";

// User Actions Types
import {
    USER_SIGN_IN,
    USERS_SET_SIGN_ERROR,
    USERS_REMOVE_SIGN_ERROR,
    USERS_SIGN_UP_STEP_SET,
    USER_SIGN_OUT,
    USER_GET_USER_EVENTS_BY_USER_ID,
    USER_SET_USER_EVENTS,
    USER_REMOVE_USER_EVENTS,
    USER_SEARCH_USER_EVENTS,
    FILTER_BY_CURRENT,
} from "../actions/usersActions";
import {
    FILL_CART,
    USER_TICKETS_GET,
    USER_TICKETS_FILTER_BY_CURRENT,
} from "../actions/usersTicketsActions";

// Initial State
import initialState from "./initialState";

// Consts
import { FILTER_EVENTS_BY_DATE, FILTER_TYPES } from "../../const";
import { SORT_TYPES } from "../../const";
const { ACTIVES, PASS, ALL } = FILTER_EVENTS_BY_DATE;

// Current Date
const currentDate = new Date();

// Funcions
import { applyFilters } from "../../functions/applyFilters";
import { applySort } from "../../functions/applySort";

// Root reducer ===========================================
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        // Events Actions =================================

        // Get all / SetAll
        case EVENTS_GET_ALL:
            return {
                ...state,
                allEvents: action.payload,
                homeEvents: action.payload,
            };
        case EVENTS_FINALIZED_GET_ALL:
            return {
                ...state,
                allEventsF: action.payload,
                homeEventsF: action.payload,
            };
        case EVENTS_SET_HOME_EVENTS:
            return {
                ...state,
                homeEvents: state.allEvents,
                currentPage: 1,
                homeFilterByProducer: FILTER_TYPES.BY_PRODUCER.ALL,
                homeFilterByDate: {
                    startDate: new Date().setHours(0, 0, 0, 0),
                    endDate: "",
                },
                homeSort: SORT_TYPES.DEFAULT,
            };

        // Search
        case EVENTS_SEARCH:
            return {
                ...state,
                homeEvents: state.allEvents.filter((event) =>
                    event.name
                        .toLowerCase()
                        .includes(action.payload.toLowerCase())
                ),
                currentPage: 1,
            };

        // Detail
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

        // Filter
        case EVENTS_SET_START_DATE_FILTER_BY_DATE:
            return {
                ...state,
                homeFilterByDate: {
                    ...state.homeFilterByDate,
                    startDate: action.payload.setHours(0, 0, 0, 0),
                },
            };

        case EVENTS_SET_END_DATE_FILTER_BY_DATE:
            return {
                ...state,
                homeFilterByDate: {
                    ...state.homeFilterByDate,
                    endDate: action.payload.setHours(23, 59, 59, 999),
                },
            };

        case EVENTS_FILTER_BY_DATE:
            const filteredEvents1 = applyFilters(
                state.allEvents,
                state.homeFilterByDate,
                state.homeFilterByProducer
            );

            const filteredAndSortedEvents1 = applySort(
                filteredEvents1,
                state.homeSort
            );

            return {
                ...state,
                homeEvents: filteredAndSortedEvents1,
                currentPage: 1,
            };

        case EVENTS_FILTER_BY_PRODUCER:
            const filteredEvents2 = applyFilters(
                state.allEvents,
                state.homeFilterByDate,
                action.payload
            );

            const filteredAndSortedEvents2 = applySort(
                filteredEvents2,
                state.homeSort
            );

            return {
                ...state,
                homeEvents: filteredAndSortedEvents2,
                homeFilterByProducer: action.payload,
                currentPage: 1,
            };

        // Sort
        case EVENTS_SORT:
            let filteredEvents3 = applyFilters(
                state.allEvents,
                state.homeFilterByDate,
                state.homeFilterByProducer
            );

            let sortedAndFilteredEvents3 = applySort(
                filteredEvents3,
                action.payload
            );

            return {
                ...state,
                homeEvents: sortedAndFilteredEvents3,
                homeSort: action.payload,
                currentPage: 1,
            };

        case EVENTS_SET_CURRENT_PAGE:
            return { ...state, currentPage: action.payload };

        
        // Users ==========================================
        case USER_SIGN_IN:
            return {
                ...state,
                userData: action.payload,
                isLogin: true,
                userSignError: "",
            };

        case USERS_SET_SIGN_ERROR:
            return { ...state, userSignError: action.payload };
        case USERS_REMOVE_SIGN_ERROR:
            return { ...state, userSignError: "" };

        case USERS_SIGN_UP_STEP_SET:
            return { ...state, signUpStep: action.payload };

        case USER_SIGN_OUT:
            return {
                ...state,
                isLogin: false,
                userData: {},
                allUserEvents: [],
                userEvents: [],
                selectedTickets: [],
            };

        // Producer Events
        case USER_GET_USER_EVENTS_BY_USER_ID:
            return {
                ...state,
                allUserEvents: action.payload,
                userEvents: action.payload
                    .sort(
                        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                    )
                    .filter((event) => {
                        return event.current === true;
                    }),
            };
        case USER_SET_USER_EVENTS:
            return {
                ...state,
                userEvents: state.allUserEvents.sort(
                    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                ),
            };
        case USER_REMOVE_USER_EVENTS:
            return { ...state, userEvents: [] };
        case USER_SEARCH_USER_EVENTS:
            return {
                ...state,
                userEvents: state.allUserEvents.filter((event) =>
                    event.name
                        .toLowerCase()
                        .includes(action.payload.toLowerCase())
                ),
            };

        case FILTER_BY_CURRENT:
            switch (action.payload) {
                case ACTIVES:
                    return {
                        ...state,
                        userEvents: state.allUserEvents.filter((event) => {
                            return event.current === true;
                        }),
                    };
                case PASS:
                    return {
                        ...state,
                        userEvents: state.allUserEvents.filter((event) => {
                            return event.current === false;
                        }),
                    };
                case ALL:
                    return { ...state, userEvents: state.allUserEvents };
            }
            break;

        // Fill Cart
        case FILL_CART:
            return { ...state, selectedTickets: action.payload };

        //UserTickets
        case USER_TICKETS_GET:
            let filteredUserTickets4 = [...action.payload];

            filteredUserTickets4 = filteredUserTickets4.filter((ticket) => {
                const eventDate = new Date(ticket.Event.date);
                eventDate.setHours(eventDate.getHours() + 3);
                return eventDate >= currentDate;
            });

            return {
                ...state,
                allUserTickets: action.payload,
                userTickets: filteredUserTickets4,
            };

        case USER_TICKETS_FILTER_BY_CURRENT:
            let filteredUserTickets5 = [...state.allUserTickets];

            switch (action.payload) {
                case ACTIVES:
                    filteredUserTickets5 = filteredUserTickets5.filter(
                        (ticket) => {
                            const eventDate = new Date(ticket.Event.date);
                            eventDate.setHours(eventDate.getHours() + 3);
                            return eventDate >= currentDate;
                        }
                    );
                    break;
                case PASS:
                    filteredUserTickets5 = filteredUserTickets5.filter(
                        (ticket) => {
                            const eventDate = new Date(ticket.Event.date);
                            eventDate.setHours(eventDate.getHours() + 3);
                            return eventDate < currentDate;
                        }
                    );
                    break;
                case ALL:
                    break;
            }
            return {
                ...state,
                userTickets: filteredUserTickets5,
            };

        // Global
        case GLOBAL_ERROR_SET:
            return { ...state, globalError: action.payload };
        case GLOBAL_ERROR_REMOVE:
            return { ...state, globalError: "" };
        case GLOBAL_SUCCESS_SET:
            return { ...state, globalSuccess: action.payload };
        case GLOBAL_SUCCESS_REMOVE:
            return { ...state, globalSuccess: "" };
        //* ----------
        default:
            return { ...state };
    }
};

export default rootReducer;
