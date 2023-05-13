import React from "react";

// React Router Dom
import { Link, useNavigate } from "react-router-dom";

// Hooks
import { useState, useEffect } from "react";

// React redux
import { connect } from "react-redux";
import { getEventsByName } from "../redux/actions/eventsActions";

// Assets
import rave from "../assets/logo3.png";

const Header = (props) => {
    // States en props:
    const { isLogin, userData } = props;

    // Dispatch en props:
    const { getEventsByName } = props;

    // Style on scroll
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScroll = () => {
        if (window.pageYOffset > window.innerHeight * 0.4) {
            setOpacity(0.7);
        } else {
            setOpacity(window.pageYOffset / (window.innerHeight * 0.4) / 1.42);
        }
    };

    const headerStyle = {
        backgroundColor: `rgba(2, 6, 23, ${opacity})`,
    };

    // Search bar logic
    const [name, setName] = useState("");

    const handleInputChange = (event) => {
        setName(event.target.value);
    };

    const navigate = useNavigate();

    const handleSearchsubmit = (event) => {
        event.preventDefault();
        navigate("/search");
        getEventsByName(name.trim());
    };

    // Sign Out
    const handleSignOut = () => {
        alert("Chau puto");
    };

    return (
        <div
            className="grid grid-cols-3 w-screen h-16 fixed top-0 z-10 font-medium"
            style={headerStyle}
        >
            <div className="flex justify-self-start items-center ml-4">
                <Link to="/">
                    <img className="w-48" src={rave} alt="Rave Motion Logo" />
                </Link>
            </div>
            <div className="flex justify-self-center items-center">
                <form onSubmit={handleSearchsubmit}>
                    <input
                        className="w-96 input"
                        type="text"
                        placeholder="Buscar evento"
                        onChange={handleInputChange}
                        onSubmit={handleSearchsubmit}
                    />
                </form>
            </div>
            <div className="flex w-fit justify-self-end justify-center my-2 items-center gap-6 py-2 px-4 bg-secondary rounded-full border border-secondaryBorder">
                <Link to="/" className="navLink">
                    Home
                </Link>
                <Link to="/about" className="navLink">
                    Nosotros
                </Link>
                {isLogin ? (
                    <>
                        {userData.accessType === "producer" && (
                            <Link to="/create" className="navLink">
                                Crear evento
                            </Link>
                        )}
                        <button
                            onClick={handleSignOut}
                            className="btnPrimary py-0 px-4 w-fit"
                        >
                            Cerrar Sesión
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/signin" className="navLink">
                            Iniciar Sesión
                        </Link>
                        <Link to="/signup" className="navLink">
                            Registrarse
                        </Link>
                    </>
                )}
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
        getEventsByName: (name) => dispatch(getEventsByName(name)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
