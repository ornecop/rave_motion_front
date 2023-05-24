const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// ============= Tickets Actions Types
export const TICKETS_GET_ALL = "TICKETS_GET_ALL";
export const TICKETS_MODIFY = "TICKETS_MODIFY";
export const TICKET_EVENT_GET = "TICKET_EVENT_GET";
export const TICKETS_CREATE = "TICKETS_CREATE";

// ============= Actions Creators
// Modifica tickets de evento
export const getAllTickets = () => {
    return async function (dispatch) {
        const tickets = (await axios.get(`BACKEND_URL/tickets`)).data;
        dispatch({ type: TICKETS_GET_ALL, payload: tickets });
    };
};

export const modifyTickets = (id, ticketsData) => {
    return async (dispatch) => {
        const response = await axios.put(
            `${BACKEND_URL}/tickets/updatetickets/${id}`,
            ticketsData
        );
        const ticketsActualiced = response.data;
        dispatch({
            type: TICKETS_MODIFY,
            payload: ticketsActualiced,
        });
    };
};

export const getTicketsEventById = (id) => {
    return async function (dispatch) {
        const response = await axios.get(
            `${BACKEND_URL}/tickets/ticketsByEvent/${id}`
        );
        const ticketsEventById = response.data;
        dispatch({
            type: TICKET_EVENT_GET,
            payload: ticketsEventById,
        });
    };
};

export const createTickets = (ticketsData) => {
    return async (dispatch) => {
        const response = await axios.post(
            `${BACKEND_URL}/tickets/createtickets`,
            ticketsData
        );
        const ticketsCreated = response.data;
        dispatch({
            type: TICKETS_CREATE,
            payload: ticketsCreated,
        });
    };
};
