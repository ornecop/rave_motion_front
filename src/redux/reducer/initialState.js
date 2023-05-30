import { FILTER_TYPES, SORT_TYPES } from "../../const";
import getCurrentDate from"../../functions/getCurrentDate"

const initialState = {
    // All events
    allEvents: [],

    // Home events
    homeEvents: [],

    homeFilterByProducer: FILTER_TYPES.BY_PRODUCER.ALL,
    homeFilterByDate: {
        startDate: getCurrentDate(),
        endDate: "",
    },
    homeSort: SORT_TYPES.DEFAULT,

    currentPage: 1,
    eventsPerPage: 10,

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
    globalError: "",
    globalSuccess: "",

    // Cart
    selectedTickets: {},
};

export default initialState;
