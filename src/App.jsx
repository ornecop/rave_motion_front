import { useEffect } from "react";
// React Router Dom
import { Routes, Route, useLocation } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { verifyToken } from "./redux/actions/usersActions";

// Components
import Alert from "./components/Alert";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Success from "./components/Success";

// App views
import About from "./views/app-views/About";
import Home from "./views/app-views/Home";
import SearchResults from "./views/app-views/SearchResults";
import NotFound from "./views/app-views/NotFound";
import Reviews from "./views/app-views/Reviews";

// Events views
import EventCart from "./views/events-tickets-views/EventCart";
import EventCreate from "./views/events-tickets-views/EventCreate";
import TicketsCreate from "./views/events-tickets-views/TicketsCreate";
import EventDetail from "./views/events-tickets-views/EventDetail";

// User views
import ChangePassword from "./views/users-views/ChangePassword";
import EmailPassword from "./views/users-views/EmailPassword";
import ProducerDashboard from "./views/users-views/ProducerDashboard";
import SignIn from "./views/users-views/SignIn";
import SignUp from "./views/users-views/SignUp";
import UserTickets from "./views/users-views/UserTickets";

// Secure Routes
import RequireAuth from "./auth/RequireAuth";
import RequireLogin from "./auth/RequireLogin";

const App = ({
    verifyToken,
    isLogin,
    userData,
    globalError,
    globalSuccess,
}) => {
    // Locations
    const location = useLocation().pathname;
    const showHeader =
        location !== "/signin" &&
        location !== "/signup" &&
        location.slice(0, 10) !== "/dashboard";
    const showFooter = location.slice(0, 10) !== "/dashboard";

    // Sign In by JSW
    useEffect(() => {
        const token = localStorage.getItem("token");
        const tokenGoogle = localStorage.getItem("tokenGoogle");
        if (token && !isLogin) {
            verifyToken(token);
        }
        if (tokenGoogle && !isLogin) {
            verifyToken(tokenGoogle);
        }
    }, [verifyToken]);

    return (
        <div className="bg-primary text-white antialiased">
            {showHeader && <Header />}
            {globalError && <Alert />}
            {globalSuccess && <Success />}
            <Routes>
                {/* App views */}
                <Route exact path="/" element={<Home />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/about" element={<About />} />
                <Route path="/search" element={<SearchResults />} />

                {/* Events views */}

                <Route path="/event/:id" element={<EventDetail />} />
                {/* Secure Routes */}
                <Route
                    path="/create/:eventId?"
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

                <Route
                    path="/cart/:eventId"
                    element={
                        <RequireLogin>
                            <EventCart />
                        </RequireLogin>
                    }
                />

                {/* User views */}

                <Route path="/changepassword" element={<EmailPassword />} />
                <Route path="/changepassword/2" element={<ChangePassword />} />
                <Route
                    path="/dashboard/:eventId?"
                    element={<ProducerDashboard />}
                />

                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/tickets" element={<UserTickets />} />

                {/* Not found Page */}
                <Route path="*" element={<NotFound />} />
            </Routes>
            {showFooter && <Footer />}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLogin: state.isLogin,
        userData: state.userData,
        globalError: state.globalError,
        globalSuccess: state.globalSuccess,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        verifyToken: (token) => dispatch(verifyToken(token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
