import React from "react";
/* =======================================================
VIEW Home - "/" - Vista principal de la página

styles:
carrousel con imagenes de fiestas
sección eventos destacados: filtros (por provincia, por productora) + orden (por fecha) + lista de eventos destacados 
info de la pagina con link a about
preguntas frecuentes
*/

// Assets
const images = [
    "https://wallpapercave.com/wp/wp1889483.jpg",
    "https://wallpapercave.com/wp/wp1889488.jpg",
];

// Components
import EventConteiner from "../../components/EventConteiner/EventConteiner";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
    // Carousel
    const [currentImage, setCurrentImage] = useState(images[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => {
                if (prevImage === images[0]) {
                    return images[1];
                } else {
                    return images[0];
                }
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Filtro por fecha
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const dispatch = useDispatch();
    const HandllerSend = (startDate, endDate) => {
        dispatch(""); //! dispatch de la action
    };

    return (
        <div className="w-full">
            {/* Carrousel */}
            <div className="h-96 overflow-hidden relative">
                <div
                    className="h-full w-full absolute top-0 left-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 transform"
                    style={{
                        backgroundImage: `url(${currentImage})`,
                        transform: "translateX(0%)",
                    }}
                ></div>
                <div
                    className="h-full w-full absolute top-0 left-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 transform"
                    style={{
                        backgroundImage: `url(${
                            currentImage === images[0] ? images[1] : images[0]
                        })`,
                        transform: "translateX(100%)",
                    }}
                ></div>
            </div>

            {/* NavBar (Filters - Orders - info resultados) */}
            <div className="flex flex-row w-screen h-16 font-medium ">
                <div className="flex flex-row justify-items-center self-start justify-center my-2 items-center gap-6 py-2 px-4 bg-secondary rounded-full border border-secondaryBorder">
                    <label htmlFor="startDate">Desde:</label>
                    <input
                        type="date"
                        className="input w-48"
                        name="startDate"
                        onChange={handleStartDateChange}
                        value={startDate}
                    />
                    <label htmlFor="endDate">Hasta:</label>
                    <input
                        type="date"
                        className="input w-48"
                        name="endDate"
                        onChange={handleEndDateChange}
                        value={endDate}
                    />
                    <button
                        className="btnPrimary h-8 p-0 w-24"
                        onClick={() => {
                            HandllerSend(startDate, endDate);
                        }}
                    >
                        Filtrar
                    </button>
                </div>
                <div className="flex flex-row justify-items-center self-end justify-center my-2 items-center gap-6 py-2 px-4 bg-secondary rounded-full border border-secondaryBorder">
                    Pagina 1/X - 392 resultados
                </div>
            </div>

            <EventConteiner />
        </div>
    );
};

export default Home;
