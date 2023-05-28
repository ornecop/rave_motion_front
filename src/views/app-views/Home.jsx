/* =======================================================
    VIEW Home - "/" - Vista principal de la página

    styles:
    carrousel con imagenes de fiestas
    sección eventos destacados: filtros (por provincia, por productora) + orden (por fecha) + lista de eventos destacados 
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
import { useDispatch, useSelector } from "react-redux";

// Actions
import { getAllEvents } from "../../redux/actions/eventsActions";
import { filterEventsByDateOrProducer } from "../../redux/actions/filtersActions";

// BORRAR!!!

const alphabeticOrder = () => {};
const dateOrder = () => {};

// Functions
import getCurrentDate from "../../functions/getCurrentDate";
import setProducer from "../../functions/setProducer";

// Const
import { FILTER_TYPES } from "../..";

const Home = (props) => {
    // Global State
    const {
        homeEvents,
        homeFilterByProducer,
        homeFilterByDate,
        homeSort,
        currentPage,
        eventsPerPage,
    } = props;

    // Actions

    const dispatch = useDispatch();

    // Get events
    const allEvents = useSelector((state) => state.allEvents);

    useEffect(() => {
        !allEvents.length && dispatch(getAllEvents());
    }, [dispatch]);

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
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage, setEventsPerPage] = useState(9);
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = homeEvents.slice(indexOfFirstEvent, indexOfLastEvent);

    const totalEvents = homeEvents.length;
    const totalPages = Math.ceil(totalEvents / eventsPerPage);

    // Orders
    const [ordersinput, setordersInput] = useState({
        orderDate: "",
        orderAlpha: "",
    });

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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
    const [filterByProducer, setFilterByProducer] = useState("All");

    const handleFilterByProducer = (event) => {
        setFilterByProducer(event.target.value);

        if (event.target.value === "All") {
            setFilterEvents({ ...filterEvents, producer: null });
            dispatch(
                filterEventsByDateOrProducer({
                    ...filterEvents,
                    producer: null,
                })
            );
            setCurrentPage(1);
            return;
        }
        setFilterEvents({ ...filterEvents, producer: event.target.value });
        dispatch(
            filterEventsByDateOrProducer({
                ...filterEvents,
                producer: event.target.value,
            })
        );
        setCurrentPage(1);
    };

    const submitFilterEvents = () => {
        dispatch(filterEventsByDateOrProducer(filterEvents));
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
                            value={homeFilterByDate.startDate}
                            min={getCurrentDate()}
                        />
                        <label htmlFor="endDate">Hasta:</label>
                        <input
                            type="date"
                            className="input"
                            name="endDate"
                            onChange={handleFilterEventsChange}
                            value={homeFilterByDate.endDate}
                            min={homeFilterByDate.startDate}
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
                        value={homeFilterByProducer}
                    >
                        <option value="" disabled selected hidden>
                            Busqueda por productora
                        </option>
                        <option value="All">Todas las productoras</option>
                        {setProducer(allEvents).map((c) => {
                            return (
                                <option id={c} value={c} key={c}>
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
                            <FaSync />
                        </button>
                    </div>
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
                        {isLoading ? null : (
                            <Paginado
                                eventsPerPage={eventsPerPage}
                                allEventos={homeEvents.length}
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
    return {
        homeEvents: state.homeEvents,
        homeFilterByProducer: state.homeFilterByProducer,
        homeFilterByDate: state.homeFilterByDate,
        homeSort: state.homeSort,
        currentPage: state.currentPage,
        eventsPerPage: state.eventsPerPage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
