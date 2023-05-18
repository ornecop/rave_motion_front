import React, { useEffect } from "react";
import axios from "axios";
// React Router Dom
import { Routes, Route, useLocation } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { verifyToken } from "./redux/actions/usersActions";

// Universal Cookies
import Cookies from "universal-cookie";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// App views
import About from "./views/app-views/About";
import Home from "./views/app-views/Home";
import SearchResults from "./views/app-views/SearchResults";
import NotFound from "./views/app-views/NotFound";

// Events views
import EventCart from "./views/events-tickets-views/EventCart";
import EventCreate from "./views/events-tickets-views/EventCreate";
import TicketsCreate from "./views/events-tickets-views/TicketsCreate";
import EventDetail from "./views/events-tickets-views/EventDetail";

// User views
import ChangePassword from "./views/users-views/ChangePassword";
import EmailPassword from "./views/users-views/EmailPassword";
import ProducerDashboard from "./views/users-views/ProducerDashboard";
import ProducerEventDetail from "./views/users-views/ProducerEventDetail";
import SignIn from "./views/users-views/SignIn";
import SignUp from "./views/users-views/SignUp";
import UserTickets from "./views/users-views/UserTickets";

// Secure Routes
import RequireAuth from "./auth/RequireAuth";

const App = ({ verifyToken, isLogin, userData }) => {
    // Locations
    const location = useLocation().pathname;
    const showHeader = location !== "/signin" && location !== "/signup";

    // Sign In by JSW
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && !isLogin) {
            verifyToken(token);
        }
    }, []);

    return (
        <div className="bg-primary text-white antialiased">
            {showHeader && <Header />}
            <Routes>
                {/* App views */}
                <Route exact path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/search" element={<SearchResults />} />

                {/* Events views */}

                <Route path="/event/:id" element={<EventDetail />} />
                {/* Secure Routes */}
                <Route
                    path="/create"
                    element={
                        <RequireAuth>
                            <EventCreate />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/create/tickets/:eventId/"
                    element={
                        <RequireAuth>
                            <TicketsCreate />
                        </RequireAuth>
                    }
                />

                <Route path="/cart/:cartId" element={<EventCart />} />

                {/* User views */}

                <Route path="/changepassword" element={<EmailPassword />} />
                <Route path="/changepassword/2" element={<ChangePassword />} />
                <Route path="/dashboard" element={<ProducerDashboard />} />
                <Route
                    path="/dashboard/:eventId"
                    element={<ProducerEventDetail />}
                />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/tickets" element={<UserTickets />} />

                {/* Not found Page */}
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLogin: state.isLogin,
        userData: state.userData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        verifyToken: (token) => dispatch(verifyToken(token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
