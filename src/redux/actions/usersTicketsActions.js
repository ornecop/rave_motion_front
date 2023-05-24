const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// ============= UsersTickets Actions Types
export const FILL_CART='FILL_CART';

export const fillCart=(selectedTickets)=>{
    return{
        type:FILL_CART,
        payload:selectedTickets
    }
}