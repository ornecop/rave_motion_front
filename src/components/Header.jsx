import React from "react";

// React Router Dom
import { Link, useNavigate } from "react-router-dom";

// Hooks
import { useState } from "react";

import { connect } from "react-redux";
import { getEventsByName } from "../redux/actions/eventsActions";
import rave from "../assets/logo3.png";
const Header = (props) => {
    // Props
    const { getEventsByName } = props;

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

    return (
        <div className="grid grid-cols-3 w-screen h-16 fixed top-0 z-10 font-medium">
            <div className="flex justify-self-start items-center ml-4">
                <Link to="/">
                    <img className="w-20" src={rave} alt="Rave Motion Logo" />
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
            <div className="flex justify-items-center justify-center my-2 items-center gap-6 py-2 px-4 bg-secondary rounded-full border border-secondaryBorder">
                <Link to="/" className="navLink">
                    Home
                </Link>
                <Link to="/about" className="navLink">
                    Nosotros
                </Link>
                <Link to="signin" className="navLink">
                    Iniciar Sesión
                </Link>
                <Link to="signup" className="navLink">
                    Registrarse
                </Link>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        getEventsByName: (name) => dispatch(getEventsByName(name)),
    };
};

export default connect(null, mapDispatchToProps)(Header);
