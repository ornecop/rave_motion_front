const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// ============= Events Actions Types
export const EVENTS_SEARCH = "EVENTS_SEARCH";
export const GET_EVENT = "GET_EVENT"

// ============= Events Actions Creators
export const getEventsByName = (name) => {
    return {
        type: EVENTS_SEARCH,
        payload: name,
    };
};

export const getEvent = ()=>{
    return async function(dispatch){
        const events = (await axios.get("http://localhost:3001/events")).data;
        dispatch({ type:  GET_EVENT, payload: events})
    
}
}