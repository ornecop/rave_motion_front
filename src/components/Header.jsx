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

<<<<<<< HEAD
    return (
    <div className="bg-primary w-full fixed z-10 content-center top-0 ">
        <div className="mt-6  mb-3 grid grid-cols-3">
=======
    return  (
        <div className="bg-primary w-full fixed z-10 content-center top-0 shadow-[0_1px_20px_rgba(0,0,0,0.25)] shadow-slate-600">
        <div className=" mt-6  mb-3 grid grid-cols-3">
>>>>>>> ef567c758668443f2ba345ebc14660973950dd19
            <div className="flex justify-self-start items-center ml-4">
                <img className="w-20" src={rave} alt="logo rave" />

            </div>
            <div className="flex justify-self-center items-center ">
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
            <div className="flex  justify-items-center justify-center items-center gap-6 py-2 px-4 bg-secondary rounded-full border border-secondaryBorder">
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
<<<<<<< HEAD
    </div>
=======
        </div>
>>>>>>> ef567c758668443f2ba345ebc14660973950dd19
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        getEventsByName: (name) => dispatch(getEventsByName(name)),
    };
};

export default connect(null, mapDispatchToProps)(Header);
