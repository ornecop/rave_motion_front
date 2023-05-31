import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// ============= Global Error Actions Types
import { GLOBAL_ERROR_SET } from "./appActions";

// ============= UsersTickets Actions Types
export const FILL_CART = "FILL_CART";
export const USER_TICKETS_GET = "USER_TICKETS";
export const USER_TICKETS_FILTER_BY_CURRENT = "USER_TICKETS_FILTER_BY_CURRENT";
export const RESERVATION = "RESERVATION"

export const fillCart = (selectedTickets) => {
    return {
        type: FILL_CART,
        payload: selectedTickets,
    };
};

export const getUserTickets = (userId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `${BACKEND_URL}/userTickets/ticketsByUser/${userId}`
            );
            dispatch({
                type: USER_TICKETS_GET,
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: GLOBAL_ERROR_SET,
                payload: error.response.data.error,
            });
        }
    };
};

export const filterUserTicketsByCurrent = (filter) => {
    return {
        type: USER_TICKETS_FILTER_BY_CURRENT,
        payload: filter,
    };
};

export const reservationNum = async(array) =>{

    let cont = 0 
    array.forEach(tanda => {
        tanda.quantity + cont;
    });

    //futuras actualizaciones...

    // return async (dispatch) =>{
    //     try {
    //         const response = await axios.post(`${BACKEND_URL}/tickets/setsumstock`, {aux: array});
    //         dispatch({
    //             type: RESERVATION,
    //             payload: cont 
    //         })
    //     } catch (error) {
    //         dispatch({
    //             type: GLOBAL_ERROR_SET,
    //             payload: error.response.data.error,
    //         });
    //     }
    // }
   

}
