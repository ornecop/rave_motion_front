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
                    className="h-8 w-96 px-4 py-4 border border-slate-500 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    type="text"
                    placeholder="Buscar evento"
                />
            </div>
            <div className="flex justify-self-end items-center mr-4 gap-6 py-2 px-4 bg-black rounded-full shadow-sm ">
                <Link
                    to="/"
                    className="text-lg hover:text-fuchsia-600 hover:font-semibold focus:outline-none transition-colors duration-300"
                >
                    Home
                </Link>
                <Link
                    to="/about"
                    className="text-lg hover:text-fuchsia-600 hover:font-semibold focus:outline-none transition-colors duration-300"
                >
                    Nosotros
                </Link>
                <Link
                    to="signin"
                    className="text-lg hover:text-fuchsia-600 hover:font-semibold focus:outline-none transition-colors duration-300"
                >
                    Iniciar Sesión
                </Link>
                <Link
                    to="signup"
                    className="text-lg hover:text-fuchsia-600 hover:font-semibold focus:outline-none transition-colors duration-300"
                >
                    Registrarse
                </Link>
            </div>
        </div>
    );
};

export default Header;
