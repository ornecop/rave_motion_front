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
    allTickets: [],
    allTicketsByEvents: [],
    // User states

    isLogin: true,
    userData: {
        id: "258ebbd4-0e47-4e92-90d7-13190f3a4745",
        accessType: "producer",
        status: true,
        firstName: "Denis",
        lastName: "Torres",
        mail: "mai2l@gmail.com",
        password:
            "$2a$10$8Bro9zc4HZxA/1ZOfyXLGeyZ/qj4XJY95tk76MsfZoIQdY0g6Uh4G",
        documentType: "DNI",
        document: "1548522489",
        birthDay: "2000-03-04T03:00:00.000Z",
        address: {
            street: "Calle Falsa",
            number: 123,
            city: "Springfield",
        },
        updatedAt: "2023-05-13T21:15:29.005Z",
        createdAt: "2023-05-13T21:15:29.005Z",
    },
    userSignError: "",
    signUpStep: 1,

    // User tickets states

    // Global states
    globalError: "",
    globalSuccess: "",
};

export default initialState;
