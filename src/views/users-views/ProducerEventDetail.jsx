import React from "react";

/* =======================================================
    VIEW ProducerEventDetail - "/dashboard/:eventName" - Vista de eventos para producers (detalle de ventas, etc)

    styles:
    Detalle de ventas de tickets y graficos 
    
*/

const ProducerEventDetail = () => {
    return (
        <section className="flex flex-col w-5/6 px-8 py-4 ">
            {/* NavBar */}
            <nav className="grid grid-cols-3 w-full h-16 ">
                <div className="flex justify-self-start items-center">
                    <span className="text-4xl font-semibold">Overview</span>
                </div>
            </nav>
        </section>
    );
};

export default ProducerEventDetail;
