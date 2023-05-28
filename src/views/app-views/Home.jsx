/* =======================================================
    VIEW Home - "/" - Vista principal de la página

    styles:
    carrousel con imagenes de fiestas
    sección eventos destacados: filtros (por provincia, por productora) +
     orden (por fecha) + lista de eventos destacados 
    info de la pagina con link a about
    preguntas frecuentes
*/

// Assets
import { images } from "../../const";
import { FaSync } from "react-icons/fa";

// Components
import EventContainer from "../../components/EventContainer";
import Paginado from "../../components/Paginado";
import Loading from "../../components/Loading";

// Hooks
import { useState, useEffect } from "react";

// React Redux
import { connect } from "react-redux";

// Actions
import {
    getAllEvents,
    setAllEventsOnHomeEvents,
} from "../../redux/actions/eventsActions";

// Functions
import getCurrentDate from "../../functions/getCurrentDate";
import setProducer from "../../functions/setProducer";

// Const
import { FILTER_TYPES, SORT_TYPES } from "../../const";

const Home = (props) => {
    // Global State
    const {
        allEvents,
        homeEvents,
        homeFilterByProducer,
        homeFilterByDate,
        homeSort,
        currentPage,
        eventsPerPage,
    } = props;

    // Actions
    const { getAllEvents, setAllEventsOnHomeEvents } = props;

    useEffect(() => {
        !allEvents.length && getAllEvents();
    }, [getAllEvents]);

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

    // Paginado
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = homeEvents.slice(indexOfFirstEvent, indexOfLastEvent);

    const totalEvents = homeEvents.length;
    const totalPages = Math.ceil(totalEvents / eventsPerPage);

    // Filter by Date
    const handleFilterByDateChange = (event) => {
        // PENDIENTE EN REDUX!!
    };

    const handleSubmitFilterEvents = (event) => {
        // PENDIENTE EN REDUX!!
    };

    // Filter by Producer
    const handleFilterByProducer = (event) => {
        // PENDIENTE EN REDUX!!
    };

    // Sort
    const handleSortEvents = (event) => {
        // PENDIENTE EN REDUX!!
    };

    // Reset
    function handleResetFilters() {
        setAllEventsOnHomeEvents();
    }

    // Loading
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

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
                    {/* Filter by producer */}
                    <div className="flex flex-row gap-2 items-center">
                        <select
                            className="inputSelect w-fit"
                            onChange={handleFilterByProducer}
                            value={homeFilterByProducer}
                        >
                            {" "}
                            <option value={FILTER_TYPES.BY_PRODUCER.ALL}>
                                Todas las productoras
                            </option>
                            {setProducer(allEvents).map((c) => {
                                return (
                                    <option id={c} value={c} key={c}>
                                        {c}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    {/* Filter by Date */}
                    <div className="flex flex-row gap-2 items-center">
                        <label htmlFor="startDate">Desde:</label>
                        <input
                            type="date"
                            className="input"
                            name="startDate"
                            onChange={handleFilterByDateChange}
                            value={homeFilterByDate.startDate}
                            min={getCurrentDate()}
                        />
                        <label htmlFor="endDate">Hasta:</label>
                        <input
                            type="date"
                            className="input"
                            name="endDate"
                            onChange={handleFilterByDateChange}
                            value={homeFilterByDate.endDate}
                            min={homeFilterByDate.startDate}
                        />
                        <button
                            className="btnPrimary h-8 py-0 px-4 w-fit"
                            onClick={handleSubmitFilterEvents}
                        >
                            Filtrar
                        </button>
                    </div>

                    {/* Sort */}
                    <div className="flex flex-row gap-2 items-center">
                        <label htmlFor="sort">Ordenar:</label>

                        <select
                            value={homeSort}
                            onChange={handleSortEvents}
                            className="inputSelect w-fit"
                            name="sort"
                        >
                            <option value={SORT_TYPES.DEFAULT}>Default</option>
                            <option value={SORT_TYPES.BY_ALPHABETIC.ASC}>
                                A-Z
                            </option>
                            <option value={SORT_TYPES.BY_ALPHABETIC.DESC}>
                                Z-A
                            </option>
                            <option value={SORT_TYPES.BY_DATE.FIRST}>
                                Próximos
                            </option>
                            <option value={SORT_TYPES.BY_DATE.LAST}>
                                Últimos
                            </option>
                        </select>
                    </div>

                    <button
                        className="btnPrimary px-2"
                        onClick={handleResetFilters}
                    >
                        <FaSync />
                    </button>
                </div>

                {/* Info paginado */}
                <div className="flex w-fit justify-self-end my-2 items-center gap-6 py-1 px-4 bg-secondary rounded-full border border-secondaryBorder mr-4">
                    {homeEvents.length} Resultados | Página{" "}
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
                        {isLoading ? null : <Paginado />}
                    </div>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        allEvents: state.allEvents,
        homeEvents: state.homeEvents,
        homeFilterByProducer: state.homeFilterByProducer,
        homeFilterByDate: state.homeFilterByDate,
        homeSort: state.homeSort,
        currentPage: state.currentPage,
        eventsPerPage: state.eventsPerPage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllEvents: () => dispatch(getAllEvents()),
        setAllEventsOnHomeEvents: () => dispatch(setAllEventsOnHomeEvents()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
