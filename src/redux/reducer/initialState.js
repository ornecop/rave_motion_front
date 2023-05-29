import { FILTER_TYPES, SORT_TYPES } from "../../const";

const initialState = {
    // All events y finalized events
    allEvents: [],
    allEventsF: [],
    // Home events
    homeEvents: [],
    homeEventsF: [],
    homeEventsFilterByProducer: "All",
    homeEventsFilterByDate: {
        startDate: null,
        endDate: null,
    },
    homeEventsOrder: "Default",
    eventsPerPage: 10,
    currentPage: 1,

    homeFilterByProducer: FILTER_TYPES.BY_PRODUCER.ALL,
    homeFilterByDate: {
        startDate: new Date(),
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
