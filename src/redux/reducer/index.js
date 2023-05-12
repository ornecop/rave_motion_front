// Events Actions Types
import { EVENTS_SEARCH,
         GET_EVENT, } from "../actions/eventsActions";

// Tickets Actions Types

// User Actions Types

// User Tickets Actions Types

// Initial State
import initialState from "./initialState";

// Root reducer
const rootReducer = (state = initialState, action) => {
    console.log(state);
    switch (action.type) {
        case EVENTS_SEARCH:
            return {
                ...state,
                searchedEvents: action.payload,
            };
        case GET_EVENT:
            return {
                ...state,
                event: action.payload, 
            }
        default:
            return { ...state };
    }
};

export default rootReducer;
