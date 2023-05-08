import React from "react";

/* =======================================================
    VIEW SignIn - "/signin" - Vista para iniciar sesión

    styles:
    A un lado el form y al otro una imagen o mockup del home
    email, password || ingresar con Google) 

    * Redirecciona al UserTickets
    
*/

// React router dom
import { Link } from "react-router-dom";

const SignIn = () => {
    return (
        <div className="w-full h-screen mt-16 flex flex-col justify-center items-center">
            <h2 className="text-4xl text-center">Bienvenido!</h2>
            <form className="flex flex-col">
                <div className="flex flex-col my-2">
                    <label htmlFor="email" className="my-1 font-semibold">
                        Email:
                    </label>
                    <input
                        className="h-8 w-96 px-4 py-4 text-black border border-slate-500 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        type="text"
                        placeholder="Tu email"
                    />
                </div>
                <div className="flex flex-col my-4">
                    <label htmlFor="password" className="my-1 font-semibold">
                        Password:
                    </label>
                    <input
                        className="h-8 w-96 px-4 py-4 text-black border border-slate-500 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        type="password"
                        placeholder="Tu contraseña"
                    />
                </div>
                <div className="flex flex-col my-4">
                    <button className="block w-full text-lg py-2 rounded-full bg-gradient-to-r from-fuchsia-800 to-pink-500 text-xl hover:font-semibold focus:outline-none transition-colors duration-300">
                        Iniciar sesión
                    </button>
                </div>
            </form>
            <div className="flex flex-col my-4">
                <Link
                    className="text-center hover:text-fuchsia-600 focus:outline-none transition-colors duration-300"
                    to="/changepassword"
                >
                    ¿Olvidaste tu contraseña?
                </Link>
                <div className="text-center flex-row">
                    Volver al{" "}
                    <Link
                        className="hover:text-fuchsia-600 focus:outline-none transition-colors duration-300"
                        to="/home"
                    >
                        home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
