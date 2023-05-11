// Events Actions Types
import { EVENTS_SEARCH } from "../actions/eventsActions";

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
        default:
            return { ...state };
    }
};

export default rootReducer;
