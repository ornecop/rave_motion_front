import React from "react";

/* =======================================================
    VIEW NotFound - "*" - 

    styles:

*/

const NotFound = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="block text-sm sm:text-2xl md:text-4xl lg:text-6xl font-semibold">
                Página no encontrada
            </h1>
            <p className="block mt-8 text-xs sm:text-sm md:text-base lg:text-lg">
                Lo sentimos, la página que está buscando no se encuentra
                disponible.
            </p>
        </div>
    );
};

export default NotFound;

