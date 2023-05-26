import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// ============= Global Action Types
import { GLOBAL_ERROR_SET } from "./appActions";

// ============= Filter Actions Types
export const EVENTS_FILTER = "EVENTS_FILTER";
export const filteredEvents = ({ startDate, endDate, producer }) => {
    return async (dispatch) => {
        try {
            let filteredEvents;

            if (producer === null && startDate && !endDate.length) {
                const response = await axios.get(
                    `${BACKEND_URL}/events/filter?startDate=${startDate}`
                );
                filteredEvents = response.data;
            } else if (startDate && endDate && producer) {
                const response = await axios.get(
                    `${BACKEND_URL}/events/filter?producer=${producer}&startDate=${startDate}&endDate=${endDate}`
                );
                filteredEvents = response.data;
            } else if (startDate && !endDate.length && producer) {
                const response = await axios.get(
                    `${BACKEND_URL}/events/filter?producer=${producer}&startDate=${startDate}`
                );
                filteredEvents = response.data;
            } else if (producer === null) {
                const response = await axios.get(
                    `${BACKEND_URL}/events/filter?startDate=${startDate}&endDate=${endDate}`
                );
                filteredEvents = response.data;
            } else if (producer !== null) {
                const response = await axios.get(
                    `${BACKEND_URL}/events/filter?producer=${producer}`
                );
                filteredEvents = response.data;
            }
            dispatch({
                type: EVENTS_FILTER,
                payload: filteredEvents,
            });
        } catch (error) {
            dispatch({
                type: GLOBAL_ERROR_SET,
                payload: error.response.data.error,
            });
        }
    };
};
