// Events Actions Types
import { EVENTS_SEARCH,
<<<<<<< HEAD
         GET_EVENT, } from "../actions/eventsActions";
=======
    GET_EVENT, } from "../actions/eventsActions";
>>>>>>> ef567c758668443f2ba345ebc14660973950dd19

// Tickets Actions Types

// User Actions Types

// User Tickets Actions Types

// Initial State
import initialState from "./initialState";

// Root reducer
const rootReducer = (state = initialState, action) => {
<<<<<<< HEAD
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
=======
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
>>>>>>> ef567c758668443f2ba345ebc14660973950dd19
};

export default rootReducer;
