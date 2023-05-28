// Hooks
import { useState, useEffect, useRef } from "react";

// React Router Dom
import { Link, useNavigate, useLocation } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { getEventsByName } from "../redux/actions/eventsActions";
import { signOut } from "../redux/actions/usersActions";

// Assets
import rave from "../assets/logo3.png";
import { GrMenu } from "react-icons/gr";

const Header = (props) => {
    const { isLogin, userData, signOut } = props;
    const { getEventsByName } = props;

    // Fondo opaco
    const [opacity, setOpacity] = useState(0);
    const handleScroll = () => {
        if (window.pageYOffset > window.innerHeight * 0.4) {
            setOpacity(0.7);
        } else {
            setOpacity(window.pageYOffset / (window.innerHeight * 0.4) / 1.42);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const headerStyle = {
        backgroundColor: `rgba(2, 6, 23, ${opacity})`,
    };

    // Dropdown User
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const handlDropdownClick = () => {
        setShowDropdown((prev) => !prev);
    };

    const location = useLocation().pathname;
    useEffect(() => {
        showDropdown && setShowDropdown(false);
    }, [location]);

    const handleOutsideClick = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    // Dropdown responsive
    const [showDropdownResponsive, setShowDropdownResponsive] = useState(false);
    const dropdownRefResponsive = useRef(null);

    const handlDropdownResponsiveClick = () => {
        setShowDropdownResponsive((prev) => !prev);
    };

    useEffect(() => {
        showDropdownResponsive && setShowDropdownResponsive(false);
    }, [location]);

    const handleOutsideClickResponsive = (event) => {
        if (
            dropdownRefResponsive.current &&
            !dropdownRefResponsive.current.contains(event.target)
        ) {
            setShowDropdownResponsive(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClickResponsive);
        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClickResponsive
            );
        };
    }, []);

    // Search
    const [name, setName] = useState("");
    const handleInputChange = (event) => {
        setName(event.target.value);
    };

    const navigate = useNavigate();
    const handleSearchsubmit = (event) => {
        event.preventDefault();
        navigate("/search");
        getEventsByName(name.trim());
        setName("");
    };

    // Sign Out
    const handleSignOut = () => {
        isLogin && signOut();
        navigate("/");
    };

    return (
        <div
            className="grid grid-cols-2 lg:grid-cols-3 w-screen h-16 fixed top-0 z-10 font-medium"
            style={headerStyle}
        >
            {/* Logo left */}
            <div className="flex justify-self-start items-center ml-4">
                <Link to="/">
                    <img
                        className="w-40 lg:w-48"
                        src={rave}
                        alt="Rave Motion Logo"
                    />
                </Link>
            </div>

            {/* Search center */}
            <div className="hidden lg:flex justify-self-center items-center">
                <form onSubmit={handleSearchsubmit}>
                    <input
                        className="w-64 xl:w-80  input"
                        type="text"
                        placeholder="Buscar evento"
                        onChange={handleInputChange}
                        onSubmit={handleSearchsubmit}
                        value={name}
                    />
                </form>
            </div>

            {/* NavMenu right */}
            <div className="hidden lg:flex w-fit justify-self-end justify-center my-2 items-center gap-6 py-2 px-4 bg-secondary rounded-full border border-secondaryBorder">
                <Link to="/" className="navLink">
                    Home
                </Link>

                <Link to="/reviews" className="navLink">
                    Reviews
                </Link>

                {isLogin ? (
                    <>
                        {/* Dropdown user  */}
                        <div
                            className="inline-block relative"
                            ref={dropdownRef}
                        >
                            <button
                                onClick={handlDropdownClick}
                                className="btnPrimary py-0 px-4 w-fit border-none"
                            >
                                Tu cuenta
                            </button>

                            <div
                                className={`"z-20 bg-secondary rounded-md w-40 left-[-2rem] top-[2rem] text-center" ${
                                    showDropdown ? "block" : "hidden"
                                }`}
                                style={{ position: "absolute" }}
                            >
                                <div className="dropDownItem border-b-2 border-secondaryBorder">
                                    <Link
                                        className="navLinkDropdown"
                                        to="/tickets"
                                    >
                                        Mis tickets
                                    </Link>
                                </div>
                                {userData.accessType === "producer" && (
                                    <>
                                        <div className="dropDownItem">
                                            <Link
                                                className="navLinkDropdown"
                                                to="/create"
                                            >
                                                Crear evento
                                            </Link>
                                        </div>
                                        <div className="dropDownItem border-b-2 border-secondaryBorder">
                                            <Link
                                                className="navLinkDropdown"
                                                to="/dashboard"
                                            >
                                                Dashboard
                                            </Link>
                                        </div>
                                    </>
                                )}

                                <div className="dropDownItem">
                                    <div
                                        onClick={handleSignOut}
                                        className="navLinkDropdown"
                                    >
                                        Cerrar Sesión
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/signin" className="navLink ">
                            Iniciar Sesión
                        </Link>
                        <Link to="/signup" className="navLink">
                            Registrarse
                        </Link>
                    </>
                )}
            </div>

            {/* Dropdown responsive right */}
            <div className="lg:hidden flex w-fit justify-self-end justify-center items-center mr-4">
                <div
                    className="inline-block relative"
                    ref={dropdownRefResponsive}
                >
                    <button
                        onClick={handlDropdownResponsiveClick}
                        className="btnPrimary py-2 px-4 w-fit border-none"
                    >
                        <GrMenu size="2rem" />
                    </button>

                    <div
                        className={`"z-20 bg-secondary border border-secondaryBorder rounded-md w-40 left-[-6rem] top-[3rem] text-center" ${
                            showDropdownResponsive ? "block" : "hidden"
                        }`}
                        style={{ position: "absolute" }}
                    >
                        <div className="dropDownItem ">
                            <Link to="/" className="navLinkDropdown">
                                Home
                            </Link>
                        </div>
                        <div className="dropDownItem">
                            <Link to="/reviews" className="navLink">
                                Reviews
                            </Link>
                        </div>
                        <div className="dropDownItem">
                            <Link to="/about" className="navLink">
                                Nosotros
                            </Link>
                        </div>
                        {isLogin ? (
                            <>
                                <div className="dropDownItem border-t-2 border-secondaryBorder">
                                    <Link
                                        className="navLinkDropdown"
                                        to="/tickets"
                                    >
                                        Mis tickets
                                    </Link>
                                </div>
                                {userData.accessType === "producer" && (
                                    <>
                                        <div className="dropDownItem">
                                            <Link
                                                className="navLinkDropdown"
                                                to="/create"
                                            >
                                                Crear evento
                                            </Link>
                                        </div>
                                        <div className="dropDownItem border-b-2 border-secondaryBorder">
                                            <Link
                                                className="navLinkDropdown"
                                                to="/dashboard"
                                            >
                                                Dashboard
                                            </Link>
                                        </div>
                                        <div className="dropDownItem">
                                            <div
                                                onClick={handleSignOut}
                                                className="navLinkDropdown"
                                            >
                                                Cerrar Sesión
                                            </div>
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <div className="dropDownItem border-t-2 border-secondaryBorder">
                                    <Link
                                        to="/signin"
                                        className="navLinkDropdown "
                                    >
                                        Iniciar Sesión
                                    </Link>
                                </div>
                                <div className="dropDownItem">
                                    <Link
                                        to="/signup"
                                        className="navLinkDropdown"
                                    >
                                        Registrarse
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
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
        signOut: () => dispatch(signOut()),
        getEventsByName: (name) => dispatch(getEventsByName(name)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
