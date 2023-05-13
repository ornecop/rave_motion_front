import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const PRODUCER_FILTER="PRODUCER_FILTER";
export const DATE_FILTER="DATE_FILTER";




export const producerFilter=(producer)=>{
    return async(dispatch)=>{
        const response=await axios.get(`http://localhost:3001/events/producer?producer=${producer}`);
        const filteredEvents=response.data;
        dispatch({
            type:PRODUCER_FILTER,
            payload:filteredEvents,
        })
    }
};

export const dateFilter=(dates)=>{
    return async(dispatch)=>{
        const response=await axios.get(`http://localhost:3001/events/date`,dates);
        const filteredEvents=response.data;
        dispatch({
            type:DATE_FILTER,
            payload:filteredEvents,
        })
    }
}

