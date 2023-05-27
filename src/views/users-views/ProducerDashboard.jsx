/* =======================================================
VIEW ProducerDashboard - "/dashboard" - Vista para producers

styles:
listado de events con acciones (edit, remove, detail)

* editar lleva a /create con los campos actuales en props
* remove hace borrado logico con el backend
* detail lleva a "/dashboard/:eventName"
*/

// Hooks
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import {
    signOut,
    getUserEventsByUserId,
    searchUserEvents,
    filterEventsByCurrent,
} from "../../redux/actions/usersActions";

// React Router Dom
import { Link } from "react-router-dom";

// Assets

import { FaExchangeAlt, FaRegEye } from "react-icons/fa";
import { MdOutlineNotificationsNone, MdDeleteOutline } from "react-icons/md";

// Components
import DashboardAside from "../../components/DashboardAside";
import EventDate from "../../components/EventDate";
import EventTickets from "../../components/EventTickets";
import ProducerKeys from "../../components/ProducerKeys";
import Tooltip from "../../components/Tooltip";

// Views
import ProducerEventDetail from "./ProducerEventDetail";

// Const
import { FILTER_EVENTS_BY_DATE, DASHBOARD_VIEWS } from "../../const";
const { ACTIVES, PASS, ALL } = FILTER_EVENTS_BY_DATE;

// Axios
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ProducerDashboard = (props) => {
    // Props
    const { userData, userEvents } = props;
    const { getUserEventsByUserId, searchUserEvents, filterEventsByCurrent } =
        props;

    // Seteo de view dependiendo la url
    const [view, setView] = useState(DASHBOARD_VIEWS.DASHBOARD);

    const { eventId } = useParams();
    useEffect(() => {
        const getParamAndSearchEvent = async () => {
            if (eventId) {
                try {
                    const response = await axios.get(
                        `${BACKEND_URL}/events/${eventId}`
                    );
                    console.log(response);
                    const eventExist =
                        response.data.name &&
                        response.data.userId === userData.id;
                    console.log("event exits: ", eventExist);
                    if (eventExist) {
                        console.log(1);
                        setView(DASHBOARD_VIEWS.EVENT_DETAIL);
                    } else {
                        console.log(2);
                        setView(DASHBOARD_VIEWS.EVENT_NOT_FOUND);
                    }
                } catch (error) {
                    console.log(3);
                    setView(DASHBOARD_VIEWS.EVENT_NOT_FOUND);
                }
            } else {
                console.log(4);
                setView(DASHBOARD_VIEWS.DASHBOARD);
            }
        };

        getParamAndSearchEvent();
    }, [eventId]);

    // Events by UserId
    useEffect(() => {
        userData?.id && getUserEventsByUserId(userData.id);
        setFilterByDate(filterByDate);
    }, [userData, getUserEventsByUserId]);

    // Search on dashboard
    const [search, setSeach] = useState("");

    // Busca eventos y los despliega en un dropdown a medida que busca
    const handleInputChange = (event) => {
        setSeach(event.target.value);
        searchUserEvents(event.target.value);
        event.target.value === "" && getUserEventsByUserId(userData.id);
    };

    // Filter events
    const [filterByDate, setFilterByDate] = useState(ACTIVES);

    const handleFilter = (event) => {
        setFilterByDate(event.target.value);
        filterEventsByCurrent(event.target.value);
    };

    // Delete event

    return (
        <div className="w-screen h-screen flex overflow-scrol">
            {/* Aside Menu */}
            <DashboardAside />

            {/* Content */}
            {view === DASHBOARD_VIEWS.DASHBOARD ? (
                <section className="flex flex-col w-5/6 px-8 py-4 ">
                    {/* NavBar */}
                    <nav className="grid grid-cols-3 w-full h-16 ">
                        <div className="flex justify-self-start items-center">
                            <span className="text-4xl font-semibold">
                                Overview
                            </span>
                        </div>
                        <div className="flex justify-self-center items-center">
                            <input
                                className="input w-96 bg-secondary border-secondaryBorder text-white"
                                type="text"
                                placeholder="Buscar evento"
                                onChange={handleInputChange}
                                value={search}
                            />
                        </div>
                        <div className="flex justify-self-end items-center">
                            <button>
                                <MdOutlineNotificationsNone size="2rem" />
                            </button>
                        </div>
                    </nav>

                    {/* Indicadores */}
                    <ProducerKeys userId={userData.id} />

                    {/* Eventos */}
                    {/* Navbar eventos */}
                    <nav className="grid grid-cols-2 w-full h-16 mt-8">
                        <div className="flex justify-self-start items-center">
                            <span className="text-4xl font-semibold">
                                Tus eventos
                            </span>
                        </div>

                        <div className="flex justify-self-end items-center">
                            <select
                                className="inputSelect bg-secondary border-secondaryBorder text-white w-fit"
                                onChange={handleFilter}
                                value={filterByDate}
                            >
                                <option value={ACTIVES}>Eventos activos</option>
                                <option value={PASS}>Eventos pasados</option>
                                <option value={ALL}>Todos los eventos</option>
                            </select>
                        </div>
                    </nav>
                    <div className="overflow-auto mt-4 scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded">
                        <table className="w-full text-start bg-secondary border border-secondaryBorder mx-2 my-4 mb-8">
                            <thead className="font-semibold border-b-4 border-fuchsia-600">
                                <tr className="">
                                    <th
                                        scope="col"
                                        className="px-2 py-3 text-start"
                                    >
                                        Nombre
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-2 py-3 text-start"
                                    >
                                        Fecha
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-2 py-3 text-center"
                                    >
                                        Tickets vendidos
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-2 py-3 text-center"
                                    >
                                        Opciones tickets
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-2 py-3 text-center"
                                    >
                                        Opciones evento
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {userEvents ? (
                                    userEvents.map((event) => (
                                        <tr className="border-b" key={event.id}>
                                            <td
                                                scope="row"
                                                className="px-2 py-4 font-semibold whitespace-nowrap"
                                            >
                                                <Link
                                                    to={`/dashboard/${event.id}`}
                                                    className="link"
                                                >
                                                    <Tooltip tooltip="Ver detalle de ventas">
                                                        {event.name}
                                                    </Tooltip>
                                                </Link>
                                            </td>
                                            <td className="px-2 py-4">
                                                <EventDate
                                                    date={event.date}
                                                    hour={event.hour}
                                                />
                                            </td>

                                            <td className="px-2 py-4 text-center">
                                                <EventTickets
                                                    tickets={event.Tickets}
                                                />
                                            </td>

                                            <td className="px-2 py-4 justify-center">
                                                <div className="flex flex-row gap-6 items-center justify-center">
                                                    <Link
                                                        to={`/create/tickets/${event.id}`}
                                                        className="link"
                                                    >
                                                        Modificar tickets
                                                    </Link>
                                                </div>
                                            </td>

                                            <td className="px-2 py-4">
                                                <div className="flex flex-row gap-6 justify-center items-center">
                                                    <Link
                                                        to={`/create/${event.id}`}
                                                        className="link"
                                                    >
                                                        <Tooltip tooltip="Modificar evento">
                                                            <FaExchangeAlt size="1.3rem" />
                                                        </Tooltip>
                                                    </Link>
                                                    <Link
                                                        to={`/event/${event.id}`}
                                                        className="link"
                                                    >
                                                        <Tooltip tooltip="Ver evento">
                                                            <FaRegEye size="1.3rem" />
                                                        </Tooltip>
                                                    </Link>
                                                    <Link>
                                                        <Tooltip tooltip="Borrar evento">
                                                            <MdDeleteOutline
                                                                size="1.3rem"
                                                                className="text-red-600"
                                                            />
                                                        </Tooltip>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            ) : view === DASHBOARD_VIEWS.EVENT_DETAIL ? (
                <ProducerEventDetail />
            ) : (
                <div>Not Found Event</div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        userEvents: state.userEvents,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserEventsByUserId: (userId) =>
            dispatch(getUserEventsByUserId(userId)),
        searchUserEvents: (name) => dispatch(searchUserEvents(name)),
        filterEventsByCurrent: (filter) =>
            dispatch(filterEventsByCurrent(filter)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProducerDashboard);
