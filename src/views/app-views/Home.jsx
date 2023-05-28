import React from "react";
/* =======================================================
VIEW Home - "/" - Vista principal de la página

styles:
carrousel con imagenes de fiestas
sección eventos destacados: filtros (por provincia, por productora) + orden (por fecha) + lista de eventos destacados 
info de la pagina con link a about
preguntas frecuentes
*/

// Images
import { images } from "../../const";

// Components
import EventContainer from "../../components/EventContainer";
import Paginado from "../../components/Paginado";
import Loading from "../../components/Loading";

// Hooks
import { useState, useEffect } from "react";

//Reset
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";

// React Redux
import { connect, useDispatch, useSelector } from "react-redux";
import { filteredEvents } from "../../redux/actions/filtersActions";
import { getAllEvents } from "../../redux/actions/eventsActions";
import { alphabeticOrder, dateOrder } from "../../redux/actions/orderActions";
import getCurrentDate from "../../functions/getCurrentDate";

// Functions
import setProducer from "../../functions/setProducer";

const Home = () => {
    const dispatch = useDispatch();
    const Events = useSelector((state) => state.allEvents);
    const allEvents = useSelector((state) => state.homeEvents);
    const allEventos = useSelector((state) => state.homeEvents);

    // Carousel
    const [currentImage, setCurrentImage] = useState(images[0]);

    // Paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage, setEventsPerPage] = useState(9);
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = allEvents.slice(indexOfFirstEvent, indexOfLastEvent);

    const totalEvents = allEvents.length;
    const totalPages = Math.ceil(totalEvents / eventsPerPage);

    //orders
    const [ordersinput, setordersInput] = useState({
        orderDate: "",
        orderAlpha: "",
    });

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
        startDate: getCurrentDate(),
        endDate: "",
        producer: null,
    });

    const handleFilterEventsChange = (event) => {
        if (event.target.name === "startDate") {
            setFilterEvents({ ...filterEvents, startDate: event.target.value });
        }
        if (event.target.name === "endDate") {
            setFilterEvents({ ...filterEvents, endDate: event.target.value });
        }
    };

    //resetFiltros
    function resetFilters() {
        setFilterEvents({
            startDate: getCurrentDate(),
            endDate: "",
            producer: null,
        });

        setFilterByProducer("Todas");
        setordersInput({ orderDate: "", orderAlpha: "" });
        setCurrentPage(1);
    }

    function handleResetFilters() {
        resetFilters();
        dispatch(getAllEvents());
    }

    // Filtro por productora
    const [filterByProducer, setFilterByProducer] = useState("Todas");

    const handleFilterByProducer = (event) => {
        setFilterByProducer(event.target.value);

        if (event.target.value === "All") {
            setFilterEvents({ ...filterEvents, producer: null });
            dispatch(filteredEvents({ ...filterEvents, producer: null }));
            setCurrentPage(1);
            return;
        }
        setFilterEvents({ ...filterEvents, producer: event.target.value });
        dispatch(
            filteredEvents({ ...filterEvents, producer: event.target.value })
        );
        setCurrentPage(1);
    };

    const submitFilterEvents = () => {
        dispatch(filteredEvents(filterEvents));
        setCurrentPage(1);
    };

    //ORDENAMIENTOS
    const handleSortAbc = (event) => {
        setordersInput({ ...ordersinput, orderAlpha: event.target.value });
        dispatch(alphabeticOrder(event.target.value));
        setCurrentPage(1);
    };

    const handleSortDate = (event) => {
        setordersInput({ ...ordersinput, orderDate: event.target.value });
        dispatch(dateOrder(event.target.value));
        setCurrentPage(1);
    };

    //loading
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    // reset filter
    function resetFilters() {
        setFilterEvents({
          startDate: getCurrentDate(),
          endDate: null,
          producer: null,
        });
        setFilterByProducer("Todas");
      }
      
      function handleResetFilters() {
        resetFilters();
        dispatch(getAllEvents());
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
                            min={getCurrentDate()}
                        />
                        <label htmlFor="endDate">Hasta:</label>
                        <input
                            type="date"
                            className="input"
                            name="endDate"
                            onChange={handleFilterEventsChange}
                            value={filterEvents.endDate}
                            min={filterEvents.startDate}
                        />
                        <button
                            className="btnPrimary h-8 py-0 px-4 w-fit"
                            onClick={submitFilterEvents}
                        >
                            Filtrar
                        </button>
                    </div>
                    <label htmlFor="startDate"></label>
                    {/*SELECT PRODUCTORAS*/}
                    <select
                        className="inputSelect w-fit"
                        onChange={handleFilterByProducer}
                        value={filterByProducer}
                    >
                        <option value="" disabled selected hidden>
                            Busqueda por productora
                        </option>
                        <option value="All">Todas las productoras</option>
                        {setProducer(Events).map((c) => {
                            return (
                                <option id={c} value={c}>
                                    {c}
                                </option>
                            );
                        })}
                    </select>
                    {/*odenamientos*/}
                    <select
                        value={ordersinput.orderAlpha}
                        onChange={(event) => {
                            handleSortAbc(event);
                        }}
                        className="inputSelect w-fit"
                    >
                        <option value="" disabled selected hidden>
                            ABC
                        </option>
                        <option value="Asc">A-Z</option>
                        <option value="Desc">Z-A</option>
                    </select>
                    <select
                        value={ordersinput.orderDate}
                        onChange={(event) => {
                            handleSortDate(event);
                        }}
                        className="inputSelect w-fit"
                    >
                        <option value="" disabled selected hidden>
                            Fechas
                        </option>
                        <option value="First">Próximos</option>
                        <option value="Last">Ultimos</option>
                    </select>
                    <div className=" flex w-fit justify-self-end my-2 items-center gap-6 py-1 px-4 btnPrimary rounded-full border border-secondaryBorder mr-4">
                        <button className="" onClick={handleResetFilters}>
                            <FontAwesomeIcon icon={faSync} />
                        </button>
                    </div>
                </div>

                {/* Info paginado */}
                <div className="flex w-fit justify-self-end my-2 items-center gap-6 py-1 px-4 bg-secondary rounded-full border border-secondaryBorder mr-4">
                    <>{allEvents.length} Resultados</> | Página{" "}
                    {totalPages ? currentPage : "0"} / {totalPages}
                </div>
            </div>

            <div className="min-h-[50vh] flex items-center justify-center">
                {isLoading ? (
                    <Loading />
                ) : currentEvents.length === 0 ? (
                    <div className="flex flex-col w-full h-full items-center justify-center">
                        <h2 className="font-bold text-center text-5xl">
                            LO SENTIMOS
                        </h2>
                        <h3 className="text-white text-xl text-center">
                            No se han encontrado resultados
                        </h3>
                    </div>
                ) : (
                    <div>
                        <EventContainer events={currentEvents} />
                        {isLoading ? null : (
                            <Paginado
                                eventsPerPage={eventsPerPage}
                                allEventos={allEventos.length}
                                paginado={paginado}
                                currentPage={currentPage}
                            />
                        )}
                    </div>
                )}
            </div>
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
