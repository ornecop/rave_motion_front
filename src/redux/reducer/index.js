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
    EVENTS_SET_HOME_EVENTS,
    EVENTS_GET_ALL,
    EVENT_DETAIL_GET,
    EVENT_DETAIL_REMOVE,
    EVENTS_SORT,
    EVENTS_FILTER_BY_DATE,
    EVENTS_FILTER_BY_PRODUCER,
    EVENTS_SET_CURRENT_PAGE,
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
import { FILTER_EVENTS_BY_DATE } from "../../const";
import { SORT_TYPES } from "../../const";
const { ACTIVES, PASS, ALL } = FILTER_EVENTS_BY_DATE;

// Current Date
const currentDate = new Date();

// Functions ==============================================

const applySort = (events, sort) => {
    let sortedEvents = [...events];

    switch (sort) {
        case SORT_TYPES.BY_ALPHABETIC.ASC:
            sortedEvents.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case SORT_TYPES.BY_ALPHABETIC.DESC:
            sortedEvents.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case SORT_TYPES.BY_DATE.FIRST:
            sortedEvents.sort((a, b) => {
                let aDate = new Date(a.date.slice(0, 10));
                aDate.setHours(aDate.getHours() + 3);

                let bDate = new Date(b.date.slice(0, 10));
                bDate.setHours(bDate.getHours() + 3);

                return bDate - aDate;
            });
            break;
        case SORT_TYPES.BY_DATE.LAST:
            sortedEvents.sort((a, b) => {
                let aDate = new Date(a.date.slice(0, 10));
                aDate.setHours(aDate.getHours() + 3);

                let bDate = new Date(b.date.slice(0, 10));
                bDate.setHours(bDate.getHours() + 3);

                return aDate - bDate;
            });
            break;
        default:
            break;
    }
    return sortedEvents;
};

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
        case EVENTS_SET_HOME_EVENTS:
            return {
                ...state,
                homeEvents: state.allEvents,
                currentPage: 1,
                homeFilterByProducer: FILTER_TYPES.BY_PRODUCER.ALL,
                homeFilterByDate: {
                    startDate: new Date(),
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
        case EVENTS_FILTER_BY_DATE:
            var filteredEventsByDate = applyFilters(state.allEvents);

            // Funcion de filtros

            var filteredAndSortedEvents = applySort(
                filteredEventsByDate,
                state.homeSort
            );

            return {
                ...state,
                homeEvents: filteredAndSortedEvents,
                homeFilterByDate: action.payload,
                currentPage: 1,
            };

        case EVENTS_FILTER_BY_PRODUCER:
            var filteredEventsByProducer = applyFilters(state.allEvents);
            return {
                ...state,
                homeEvents: filteredEventsByProducer,
                currentPage: 1,
                filter: action.payload,
            };

        // Sort
        case EVENTS_SORT:
            let sortedEvents = applySort(state.allEvents, action.payload);

            // const sortedAndFilteredEvents = applyFilters(sortedEvents, ... )

            return {
                ...state,
                homeSort: action.payload,
                homeEvents: sortedAndFilteredEvents,
                currentPage: 1,
            };

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

        case EVENTS_SET_CURRENT_PAGE:
            return { ...state, currentPage: action.payload };

        // Fill Cart
        case FILL_CART:
            return { ...state, selectedTickets: action.payload };

        //UserTickets
        case USER_TICKETS_GET:
            return {
                ...state,
                allUserTickets: action.payload,
                userTickets: action.payload.filter((ticket) => {
                    const eventDate = new Date(ticket.Event.date);
                    return eventDate >= currentDate;
                }),
            };

        case USER_TICKETS_FILTER_BY_CURRENT:
            let filteredUserTickets = state.allUserTickets;

            switch (action.payload) {
                case ACTIVES:
                    filteredUserTickets = filteredUserTickets.filter(
                        (ticket) => {
                            const eventDate = new Date(ticket.Event.date);
                            return eventDate >= currentDate;
                        }
                    );
                    break;
                case PASS:
                    filteredUserTickets = filteredUserTickets.filter(
                        (ticket) => {
                            const eventDate = new Date(ticket.Event.date);
                            return eventDate < currentDate;
                        }
                    );
                    break;
                case ALL:
                    break;
            }
            return {
                ...state,
                userTickets: filteredUserTickets,
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
