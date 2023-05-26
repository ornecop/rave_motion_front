import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// ============= UsersTickets Actions Types
export const FILL_CART='FILL_CART';
export const USER_TICKETS='USER_TICKETS';

export const fillCart=(selectedTickets)=>{
    return{
        type:FILL_CART,
        payload:selectedTickets
    }
}

export const getUserTickets=(userId)=>{
    return async(dispatch)=>{
        console.log('ahhhhh');
        try {
            const response=await axios.get(`${BACKEND_URL}/userTickets/ticketsByUser/${userId}`)
            console.log('data',response.data);
            dispatch({
                type:USER_TICKETS,
                payload:response.data
            })
        } catch (error) {
            console.log('error',error);
            dispatch({
                type: USERS_SET_SIGN_ERROR,
                payload: error.response.data.error,
            });
        }
    }
}
