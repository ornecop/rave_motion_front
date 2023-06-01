import { FILTER_TYPES, SORT_TYPES } from "../../const";
import getSixMonthDate from "../../functions/getSixMonthDate";

const initialState = {
    // All events y finalized events
    allEvents: [],
    allEventsF: [],
    // Home events
    homeEvents: [],
    homeEventsF: [],

    eventsPerPage: 10,
    currentPage: 1,

    homeFilterByProducer: FILTER_TYPES.BY_PRODUCER.ALL,
    homeFilterByDate: {
        startDate: new Date().setHours(0, 0, 0, 0),
        endDate: "",
    },
    homeSort: SORT_TYPES.DEFAULT,

    // Detail event
    eventDetail: {},

    // Tickets states
    allTickets: [],
    allTicketsByEvents: [],

    // User states
    isLogin: false,
    userData: {},
    userSignError: "",
    signUpStep: 1,

    // Producer Events
    userEvents: [],
    allUserEvents: [],

    // User tickets
    userTickets: [],
    allUserTickets: [],

    // Global states
    globalError:
        "Error terrible comprobar la base de datos que esta por explotar.",
    globalSuccess: "",

    // Cart
    selectedTickets: {},
};

export default initialState;
