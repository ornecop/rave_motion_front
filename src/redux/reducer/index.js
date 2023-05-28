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
} from "../actions/eventsActions";

// Filters & Orders
import { EVENTS_FILTER } from "../actions/filtersActions";
import { ALPHABETIC_ORDER, DATE_ORDER } from "../actions/orderActions";
import { FILTER_EVENTS_BY_DATE } from "../../const";

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
const { ACTIVES, PASS, ALL } = FILTER_EVENTS_BY_DATE;
const currentDate = new Date();

// Root reducer
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        // Events Actions =============================
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

        // Filtros
        case EVENTS_FILTER:
            return { ...state, homeEvents: action.payload, currentPage: 1 };

        // Order

        case ALPHABETIC_ORDER:
            let order = [...state.homeEvents];

            if (action.payload === "Asc") {
                order.sort((a, b) => a.name.localeCompare(b.name));
            }
            if (action.payload === "Desc") {
                order.sort((a, b) => b.name.localeCompare(a.name));
            }
            return {
                ...state,
                homeEvents: order,
                currentPage: 1,
            };

        case DATE_ORDER:
            const dateOrder = [...state.homeEvents];
            if (action.payload === "Last") {
                dateOrder.sort((a, b) => new Date(b.date) - new Date(a.date));
            }
            if (action.payload === "First") {
                dateOrder.sort((a, b) => new Date(a.date) - new Date(b.date));
            }
            return {
                ...state,
                homeEvents: dateOrder,
                currentPage: 1,
            };

        // Users
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
