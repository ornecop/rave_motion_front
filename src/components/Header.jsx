import React from "react";

// React Router Dom
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="grid grid-cols-3 w-full h-16 fixed top-0 z-10 content-center">
            <div className="flex justify-self-start items-center ml-4">
                <Link to="/">Logo Here</Link>
            </div>
            <div className="flex justify-self-center items-center ">
                <input
                    className="w-96 input"
                    type="text"
                    placeholder="Buscar evento"
                />
            </div>
            <div className="flex justify-self-end items-center mr-4 gap-6 py-2 px-4 bg-secondary rounded-full border border-secondaryBorder">
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

export default Header;
