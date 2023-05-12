const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// ============= Tickets Actions Types
export const TICKETS_MODIFY = "TICKETS_MODIFY";

// ============= Actions Creators
// Modifica tickets de evento
export const modifyTickets = (id, ticketsData) => {
    return async (dispatch) => {
        const response = await axios.put(
            `${BACKEND_URL}/tickets/${id}`,
            ticketsData
        );
        const ticketsActualiced = response.data;
        dispatch({
            type: TICKETS_MODIFY,
            payload: ticketsActualiced,
        });
    };
};
