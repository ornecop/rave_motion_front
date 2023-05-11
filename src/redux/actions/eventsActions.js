const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// ============= Events Actions Types
export const EVENTS_SEARCH = "EVENTS_SEARCH";

// ============= Events Actions Creators
export const getEventsByName = (name) => {
    return {
        type: EVENTS_SEARCH,
        payload: name,
    };
};
