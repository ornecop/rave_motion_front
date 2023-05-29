import React from "react";

// React router dom
import { Link } from "react-router-dom";

const Footer = () => {
    const date = new Date();

    return (
        <div className="grid grid-cols-2 w-full h-12 content-center">
            <div className="flex justify-self-start items-center ml-4">
                <Link to="/about" className="link text-white">
                    RaveMotion
                </Link>
                {"  "} © {date.getFullYear()}
            </div>

            <div className="flex justify-self-end items-center mr-4 gap-6">
                <a
                    href="mailto:info@ravemotion.com?subject=Quiero%ser%promotor"
                    className="link text-white"
                >
                    Vende con nosotros
                </a>
            </div>
        </div>
    );
};

export default Footer;
