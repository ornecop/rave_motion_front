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
import { filteredEvents } from "../../redux/actions/filtersActions";
import { getAllEvents } from "../../redux/actions/eventsActions";
import { alphabeticOrder, dateOrder } from "../../redux/actions/orderActions";

// Functions
import setProducer from "../../functions/setProducer";

// Paginado
import Paginado from '../../components/Paginado'
const Home = () => {
    const dispatch = useDispatch();
    const Events = useSelector((state) => state.allEvents);
    const allEvents = useSelector((state) => state.homeEvents);
    const allEventos = useSelector((state) => state.homeEvents);


    // Carousel
    const [currentImage, setCurrentImage] = useState(images[0]);
    // PAGINADO
    const [currentPage, setCurrentPage] = useState(1)
    const [eventsPerPage, setEventsPerPage] = useState(3)
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = allEvents.slice(indexOfFirstEvent, indexOfLastEvent)
    const totalEvents = allEvents.length;
    const totalPages = Math.ceil(totalEvents / eventsPerPage);


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    useEffect(() => {
        !Events.length && dispatch(getAllEvents());
    }, []);


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

    // Filtros
    const [filterEvents, setFilterEvents] = useState({
        startDate: null,
        endDate: null,
        producer:null
    });

    const handleFilterEventsChange = (event) => {
        if (event.target.name === "startDate") {
            setFilterEvents({ ...filterEvents, startDate: event.target.value });
        }
        if (event.target.name === "endDate") {
            setFilterEvents({ ...filterEvents, endDate: event.target.value });
        }
    };

    // Filtro por productora
    const [filterByProducer, setFilterByProducer] = useState("Todas");

    const handleFilterByProducer = (event) => {
        setFilterByProducer(event.target.value);
        
        if(event.target.value === "All"){
        setFilterEvents({ ...filterEvents, producer: null});
        dispatch(filteredEvents({...filterEvents, producer: null}))
        return}

        setFilterEvents({ ...filterEvents, producer: event.target.value});
        dispatch(filteredEvents({...filterEvents, producer: event.target.value}));
    };


    const submitFilterEvents = () => {
        dispatch(filteredEvents(filterEvents))
    };

    //ORDENAMIENTOS
    const handleSortAbc=(event)=>{
        dispatch(alphabeticOrder(event.target.value)) 
    }

    const handleSortDate=(event)=>{
        dispatch(dateOrder(event.target.value))
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
                            onChange={handleFilterEventsChange}
                            value={filterEvents.startDate}
                        />
                        <label htmlFor="endDate">Hasta:</label>
                        <input
                            type="date"
                            className="input"
                            name="endDate"
                            onChange={handleFilterEventsChange}
                            value={filterEvents.endDate}
                        />
                        <button
                            className="btnPrimary h-8 py-0 px-4 w-fit"
                            onClick={submitFilterEvents}
                        >
                            Filtrar
                        </button>
                    </div>
                    <label htmlFor="startDate">Filtrar:</label>
                    {/*SELECT PRODUCTORAS*/}
                    <select
                        className="inputSelect w-fit"
                        onChange={handleFilterByProducer}

                        value={filterByProducer}>
                        <option value=""disabled selected hidden>Busqueda por productora</option>
                        <option value="All">Todas las productoras</option>
                        {setProducer(Events).map(c => {
                    return(
                        <option id={c} value={c}>{c}</option>
                    )})}

                    </select>
                    {/*odenamientos*/}
                    <select onChange={(event)=>{handleSortAbc(event)}}className="inputSelect w-fit">
                        <option value=""disabled selected hidden>ABC</option>
                        <option value='Asc'>A-Z</option>
                        <option value='Desc'>Z-A</option>
                    </select>
                    <select onChange={(event)=>{handleSortDate(event)}}className="inputSelect w-fit">
                        <option value=""disabled selected hidden>Fechas</option>
                        <option value='First'>Próximos</option>
                        <option value='Last'>Ultimos</option>
                    </select>
                </div>

                {/* Info paginado */}
                <div className="flex w-fit justify-self-end my-2 items-center gap-6 py-1 px-4 bg-secondary rounded-full border border-secondaryBorder mr-4">
                    <>{allEvents.length} Resultados</> | Página {currentPage} / {totalPages}
                </div>
            </div>

            <Paginado eventsPerPage={eventsPerPage} allEventos={allEventos.length} paginado={paginado} currentPage={currentPage}/>          
            <EventContainer events={currentEvents} />


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