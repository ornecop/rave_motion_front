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
import { useLocation, useNavigate } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import {
    signOut,
    getUserEventsByUserId,
    searchUserEvents,
} from "../../redux/actions/usersActions";

// React Router Dom
import { Link } from "react-router-dom";

// Assets
import { TiHomeOutline } from "react-icons/ti";
import { BsCalendarPlus } from "react-icons/bs";
import { IoTicketOutline } from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";
import { GoLock } from "react-icons/go";

import { FaExchangeAlt, FaRegEye } from "react-icons/fa";
import {
    MdOutlineDashboardCustomize,
    MdInsertChartOutlined,
    MdOutlineNotificationsNone,
    MdDeleteOutline,
} from "react-icons/md";

// Components
import EventDate from "../../components/EventDate";
import EventTickets from "../../components/EventTickets";
import Tooltip from "../../components/Tooltip";
import ProducerKeys from "../../components/ProducerKeys";

// Views
import ProducerEventDetail from "./ProducerEventDetail";

// Const
import { FILTER_EVENTS_BY_DATE } from "../../const";
const { ACTIVE, PASS, ALL } = FILTER_EVENTS_BY_DATE;

const ProducerDashboard = (props) => {
    // Props
    const { isLogin, userData, signOut, userEvents } = props;
    const { getUserEventsByUserId, searchUserEvents } = props;

    const [view, setView] = useState("dashboard");
    const location = useLocation().pathname;
    useEffect(() => {}, [location]);

    // Events by UserId
    useEffect(() => {
        userData?.id && getUserEventsByUserId(userData.id);
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
    const [filterByDate, setFilterByDate] = useState(ACTIVE);

    const handleFilter = (event) => {
        setFilterByDate(event.target.value);
    };

    // SignOut
    const navigate = useNavigate();
    const handleSignOutClick = () => {
        isLogin && signOut();
        navigate("/");
        console.log("ok");
    };

    return (
        <div className="w-screen h-screen flex overflow-scrol">
            <aside className="w-1/6 bg-secondary py-4">
                {/* Section logo */}
                <div className="flex w-full px-4 py-2 items-center h-16 gap-2">
                    <div className="bg-slate-500 rounded-full w-12 h-12 flex justify-center items-center text-2xl font-semibold">
                        <span>
                            {userData?.firstName &&
                                userData.firstName[0].toUpperCase()}
                        </span>
                    </div>
                    <div className="flex justify-center items-center text-2xl font-semibold">
                        <span>Ravemotion</span>
                    </div>
                </div>

                {/* Section App */}
                <div className="dropDownItem mt-8">
                    <Link className="navLinkDropdown" to="/dashboard">
                        <div className="flex flex-row items-center gap-2">
                            <MdOutlineDashboardCustomize size="1.5rem" />
                            Dashboard
                        </div>
                    </Link>
                </div>
                <div className="dropDownItem ">
                    <Link className="navLinkDropdown" to="/">
                        <div className="flex flex-row items-center gap-2">
                            <TiHomeOutline size="1.5rem" />
                            Home
                        </div>
                    </Link>
                </div>

                {/* Section Producer */}
                <div className="dropDownItem mt-8">
                    <Link className="navLinkDropdown" to="/">
                        <div className="flex flex-row items-center gap-2">
                            <MdInsertChartOutlined size="1.5rem" />
                            Ventas
                        </div>
                    </Link>
                </div>
                <div className="dropDownItem ">
                    <Link className="navLinkDropdown" to="/create">
                        <div className="flex flex-row items-center gap-2">
                            <BsCalendarPlus size="1.5rem" />
                            Nuevo evento
                        </div>
                    </Link>
                </div>

                {/* Section User */}
                <div className="dropDownItem mt-8">
                    <Link className="navLinkDropdown" to="/tickets">
                        <div className="flex flex-row items-center gap-2">
                            <IoTicketOutline size="1.5rem" />
                            Tus tickets
                        </div>
                    </Link>
                </div>
                <div className="dropDownItem ">
                    <Link className="navLinkDropdown" to="/changepassword">
                        <div className="flex flex-row items-center gap-2">
                            <GoLock size="1.5rem" />
                            Cambiar contraseña
                        </div>
                    </Link>
                </div>
                <div className="dropDownItem ">
                    <Link
                        className="navLinkDropdown"
                        onClick={handleSignOutClick}
                    >
                        <div className="flex flex-row items-center gap-2">
                            <VscSignOut size="1.5rem" />
                            Cerrar sesión
                        </div>
                    </Link>
                </div>
            </aside>

            {/* Content */}
            {view === "dashboard" ? (
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
                    <ProducerKeys />

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
                                <option value={ACTIVE} selected>
                                    Eventos activos
                                </option>
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
                                        Tickets disponibles
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
                                                    to={`/dashboard/event/${event.id}`}
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
            ) : (
                <ProducerEventDetail />
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLogin: state.isLogin,
        userData: state.userData,
        userEvents: state.userEvents,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
        getUserEventsByUserId: (userId) =>
            dispatch(getUserEventsByUserId(userId)),
        searchUserEvents: (name) => dispatch(searchUserEvents(name)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProducerDashboard);
