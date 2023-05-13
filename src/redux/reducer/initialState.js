const initialState = {
    // All events
    allEvents: [],

    // Home events
    homeEvents: [],
    homeEventsFilterByProducer: "All",
    homeEventsFilterByDate: {
        startDate: null,
        endDate: null,
    },
    homeEventsOrder: "Default",
    eventsPerPage: 10,
    currentPage: 1,

    // Search events
    searchResult: [],

    // Detail event
    eventDetail: {},

    // Tickets states
    allTickets:[],
    allTicketsByEvents:[],
    // User states

    isLogin: false,
    userData: {},
    userSignError: "",
    signUpStep: 1,

    // User tickets states

    // Global states
    globalError: "",
    globalSuccess: "",
};

export default initialState;
