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
import EventContainer from "../../components/EventContainer";

// Hooks
import { useState, useEffect } from "react";

// React Redux
import { connect, useDispatch, useSelector } from "react-redux";
import { dateFilter } from "../../redux/actions/filtersActions";
import { getAllEvents } from "../../redux/actions/eventsActions";
import {alphabeticOrder, dateOrder} from"../../redux/actions/orderActions"

const Home = () => {
    const dispatch=useDispatch();
    const allEvents=useSelector(state=>state.homeEvents)
    // Carousel
    const [currentImage, setCurrentImage] = useState(images[0]);

    useEffect(()=>{
        dispatch(getAllEvents())
        console.log(allEvents);
    },[])

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
        if(event.target.name==='startDate'){
            setFilterByDate({...filterByDate, startDate:event.target.value})
        }
        if(event.target.name==='endDate'){
            setFilterByDate({...filterByDate, endDate:event.target.value})
        }
    };

    const submitFilterByDate = (filterByDate) => {
        //dispatch(dateFilter(filterByDate))
    };

    // I M P O R T A N T E !!
    // ORDENAMIENTOS En espera de botones selects! :)

    //dispatch(alphabeticOrder("Asc"))  --> despachar el string "Asc" O el string "Desc" PARA EL ORDENAMIENTO ENSU RESPECTIVO HANDLER
    //dispatch(alphabeticOrder("Desc"))

    //dispatch(dateOrder("First")); --> proximas fechas
    //dispatch(dateOrder("Last")); --> ultimas fechas

    // Filtro por productora
    const [filterByProducer, setFilterByProducer] = useState("Todas");

    const handleFilterByProducer = (event) => {
        setFilterByProducer(event.target.value);
    };
    const alphabeticOrderEvents = (event)=>{
        
    }
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
                    <>{allEvents.length} Resultados</> | Página 1/5
                </div>
            </div>

            <EventContainer events={allEvents} />
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
