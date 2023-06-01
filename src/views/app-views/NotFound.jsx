/* =======================================================
    VIEW NotFound - "*" - 

    styles:

*/

import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center mx-4">
            <h1 className="block text-3xl lg:text-6xl font-semibold">
                Página no encontrada
            </h1>
            <p className="block mt-8 text-lg text-center lg:text-xl">
                Lo sentimos, la página que está buscando no se encuentra
                disponible.
            </p>
            <div className="text-center text-lg mt-4 font-semibold">
                Volver al{" "}
                <Link className="link" to="/">
                    home.
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
