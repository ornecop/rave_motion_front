import React from "react";

// React router dom
import { Link } from "react-router-dom";

const Footer = () => {
    const date = new Date();

    return (
        <div className="grid grid-cols-2 w-full h-12 content-center">
            <div className="flex justify-self-start items-center ml-4">
                <Link
                    to="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-fuchsia-600 hover:font-semibold focus:outline-none transition-colors duration-300"
                >
                    RaveMotion
                </Link>
                {"  "} © {date.getFullYear()}
            </div>

            <div className="flex justify-self-end items-center mr-4 gap-6">
                <Link
                    to="/"
                    className="hover:text-fuchsia-600 hover:font-semibold focus:outline-none transition-colors duration-300"
                >
                    Home
                </Link>
                <Link
                    to="/about"
                    className="hover:text-fuchsia-600 hover:font-semibold focus:outline-none transition-colors duration-300"
                >
                    Nosotros
                </Link>
            </div>
        </div>
    );
};

export default Footer;
