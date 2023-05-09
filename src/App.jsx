import React from "react";

// React Router Dom
import { Routes, Route, useLocation } from "react-router-dom";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// App views
import About from "./views/app-views/About";
import Home from "./views/app-views/Home";
import SearchResults from "./views/app-views/SearchResults";
import NotFound from "./views/app-views/NotFound";

// Events views
import EventCart from "./views/events-views/EventCart";
import EventCreate from "./views/events-views/EventCreate";
import EventDetail from "./views/events-views/EventDetail";

// User views
import PasswordChange from "./views/users-views/PasswordChange";
import ProducerDashboard from "./views/users-views/ProducerDashboard";
import ProducerEventDetail from "./views/users-views/ProducerEventDetail";
import SignIn from "./views/users-views/SignIn";
import SignUp from "./views/users-views/SignUp";
import UserTickets from "./views/users-views/UserTickets";

export const App = () => {
    // Locations
    const location = useLocation().pathname;

    const showHeader = location !== "/signin" && location !== "/signup";

    return (
        <div className="bg-primary text-white antialiased">
            {showHeader && <Header />}
            <Routes>
                {/* App views */}
                <Route exact path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route
                    path="/search/:searchedName"
                    element={<SearchResults />}
                />

                {/* Events views */}
                <Route path="/event/:eventName" element={<EventDetail />} />
                <Route path="/create" element={<EventCreate />} />
                <Route path="/cart" element={<EventCart />} />

                {/* User views */}

                <Route path="/changepassword" element={<PasswordChange />} />
                <Route path="/dashboard" element={<ProducerDashboard />} />
                <Route
                    path="/dashboard/:eventName"
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
