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

const events = [
    {
        name: "Megajodita2",
        image: "https://www.serargentino.com/public/images/2020/12/16093491340-Joda-773x458.jpg",
        description: "en la pera",
        date: "2024-09-20",
        hour: "02:00:00",
        venue: "Calle Falsa 456",
        producer: "The Bow",
        userId: "33bf78c3-51b7-41fc-a5b3-a85b7161ccc4",
    },
    {
        name: "juelodita2",
        image: "https://www.serargentino.com/public/images/2020/12/16093491340-Joda-773x458.jpg",
        description: "en Venecolandia",
        date: "2024-04-10",
        hour: "03:00:00",
        venue: "Calle Falsa 556",
        producer: "The killers",
        userId: "33bf56c3-55b7-413c-a5b3-a85b7161ccc4",
    },
    {
        name: "La Muñeca",
        image: "https://www.serargentino.com/public/images/2020/12/16093491340-Joda-773x458.jpg",
        description: "en Colombiche",
        date: "2025-04-10",
        hour: "05:00:00",
        venue: "Calle Falsa 556",
        producer: "The Ampa",
        userId: "33bf56c3-55b7-413c-a5b3-a85b7452ccc4",
    },
    {
        name: "El Rumbon",
        image: "https://www.serargentino.com/public/images/2020/12/16093491340-Joda-773x458.jpg",
        description: "el desmadre",
        date: "2025-04-16",
        hour: "15:00:00",
        venue: "Calle tu mama 556",
        producer: "The Ampa",
        userId: "42jf56c3-35b7-413c-a5b3-a85b7452ccc4",
    },
    {
        name: "Megajodita2",
        image: "https://www.serargentino.com/public/images/2020/12/16093491340-Joda-773x458.jpg",
        description: "en la pera",
        date: "2024-09-20",
        hour: "02:00:00",
        venue: "Calle Falsa 456",
        producer: "The Bow",
        userId: "33bf78c3-51b7-41fc-a5b3-a85b7161ccc4",
    },
    {
        name: "juelodita2",
        image: "https://www.serargentino.com/public/images/2020/12/16093491340-Joda-773x458.jpg",
        description: "en Venecolandia",
        date: "2024-04-10",
        hour: "03:00:00",
        venue: "Calle Falsa 556",
        producer: "The killers",
        userId: "33bf56c3-55b7-413c-a5b3-a85b7161ccc4",
    },
    {
        name: "La Muñeca",
        image: "https://www.serargentino.com/public/images/2020/12/16093491340-Joda-773x458.jpg",
        description: "en Colombiche",
        date: "2025-04-10",
        hour: "05:00:00",
        venue: "Calle Falsa 556",
        producer: "The Ampa",
        userId: "33bf56c3-55b7-413c-a5b3-a85b7452ccc4",
    },
    {
        name: "El Rumbon",
        image: "https://www.serargentino.com/public/images/2020/12/16093491340-Joda-773x458.jpg",
        description: "el desmadre",
        date: "2025-04-16",
        hour: "15:00:00",
        venue: "Calle tu mama 556",
        producer: "The Ampa",
        userId: "42jf56c3-35b7-413c-a5b3-a85b7452ccc4",
    },
    {
        name: "Megajodita2",
        image: "https://www.serargentino.com/public/images/2020/12/16093491340-Joda-773x458.jpg",
        description: "en la pera",
        date: "2024-09-20",
        hour: "02:00:00",
        venue: "Calle Falsa 456",
        producer: "The Bow",
        userId: "33bf78c3-51b7-41fc-a5b3-a85b7161ccc4",
    },
    {
        name: "juelodita2",
        image: "https://www.serargentino.com/public/images/2020/12/16093491340-Joda-773x458.jpg",
        description: "en Venecolandia",
        date: "2024-04-10",
        hour: "03:00:00",
        venue: "Calle Falsa 556",
        producer: "The killers",
        userId: "33bf56c3-55b7-413c-a5b3-a85b7161ccc4",
    },
    {
        name: "La Muñeca",
        image: "https://www.serargentino.com/public/images/2020/12/16093491340-Joda-773x458.jpg",
        description: "en Colombiche",
        date: "2025-04-10",
        hour: "05:00:00",
        venue: "Calle Falsa 556",
        producer: "The Ampa",
        userId: "33bf56c3-55b7-413c-a5b3-a85b7452ccc4",
    },
    {
        name: "El Rumbon",
        image: "https://www.serargentino.com/public/images/2020/12/16093491340-Joda-773x458.jpg",
        description: "el desmadre",
        date: "2025-04-16",
        hour: "15:00:00",
        venue: "Calle tu mama 556",
        producer: "The Ampa",
        userId: "42jf56c3-35b7-413c-a5b3-a85b7452ccc4",
    },
];

// Components
import EventContainer from "../../components/EventContainer";

// Hooks
import { useState, useEffect } from "react";

// React Redux
import { connect } from "react-redux";

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
    const [filterByDate, setFilterByDate] = useState({
        startDate: null,
        endDate: null,
    });

    const handleFilterByDateChange = (event) => {
        console.log(event.target.value);
        console.log(event.target.name);
    };

    const submitFilterByDate = (filterByDate) => {
        alert("filter by date");
    };

    // Filtro por productora
    const [filterByProducer, setFilterByProducer] = useState("Todas");

    const handleFilterByProducer = (event) => {
        setFilterByProducer(event.target.value);
    };

    return (
        <div className="w-full min-h-screen">
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
            <div className="grid grid-cols-2 w-screen h-16 mt-4">
                <div className="flex w-fit justify-self-start my-2 items-center gap-6 py-1 px-4 bg-secondary rounded-full border border-secondaryBorder ml-4">
                    <div className="flex flex-row gap-2 items-center">
                        <label htmlFor="startDate">Desde:</label>
                        <input
                            type="date"
                            className="input"
                            name="startDate"
                            onChange={handleFilterByDateChange}
                            value={filterByDate.startDate}
                        />
                        <label htmlFor="endDate">Hasta:</label>
                        <input
                            type="date"
                            className="input"
                            name="endDate"
                            onChange={handleFilterByDateChange}
                            value={filterByDate.endDate}
                        />
                        <button
                            className="btnPrimary h-8 py-0 px-4 w-fit"
                            onClick={submitFilterByDate}
                        >
                            Filtrar
                        </button>
                    </div>
                    <label htmlFor="startDate">Filtrar:</label>
                    <select
                        className="inputSelect w-fit"
                        onChange={handleFilterByProducer}
                        value={filterByProducer}
                    >
                        <option value="Todas las productoras">
                            Todas las productoras
                        </option>
                        <option value="theBow">The Bow</option>
                        <option value="theBow">The Bow</option>
                        <option value="theBow">The Bow</option>
                        <option value="theBow">The Bow</option>
                    </select>
                </div>

                {/* Info paginado */}
                <div className="flex w-fit justify-self-end my-2 items-center gap-6 py-1 px-4 bg-secondary rounded-full border border-secondaryBorder mr-4">
                    200 resultados | Página 1/5
                </div>
            </div>

            <EventContainer events={events} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
