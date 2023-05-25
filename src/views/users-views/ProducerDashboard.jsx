/* =======================================================
VIEW ProducerDashboard - "/dashboard" - Vista para producers

styles:
listado de events con acciones (edit, remove, detail)

* editar lleva a /create con los campos actuales en props
* remove hace borrado logico con el backend
* detail lleva a "/dashboard/:eventName"
*/

// Hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { signOut } from "../../redux/actions/usersActions";

// React Router Dom
import { Link } from "react-router-dom";

// Assets
import {
    MdOutlineDashboardCustomize,
    MdInsertChartOutlined,
    MdOutlineNotificationsNone,
    MdEventAvailable,
    MdDeleteOutline,
} from "react-icons/md";
import { TiHomeOutline } from "react-icons/ti";
import { BsCalendarPlus } from "react-icons/bs";
import { IoTicketOutline } from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";
import { GoLock } from "react-icons/go";
import { RiLineChartLine } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaExchangeAlt } from "react-icons/fa";

const ProducerDashboard = ({ isLogin, userData, signOut }) => {
    // Search on dashboard
    const [search, setSeach] = useState("");

    // Busca eventos y los despliega en un dropdown a medida que busca
    const handleInputChange = (event) => {
        setSeach(event.target.value);
    };

    // Filter events
    const [filterByDate, setFilterByDate] = useState("active_events");

    const handleFilter = (event) => {
        setFilterByDate(event.target.value);
    };

    // SignOut
    const navigate = useNavigate();
    const handleSignOutClick = () => {
        isLogin && signOut();
        navigate("/");
    };

    return (
        <div className="w-screen h-screen flex overflow-scrol">
            <aside className="w-1/6 bg-secondary py-4">
                {/* Section logo */}
                <div className="flex w-full px-4 py-2 items-center h-16 gap-2">
                    <div className="bg-slate-500 rounded-full w-12 h-12 flex justify-center items-center text-2xl font-semibold">
                        <span>{userData?.firstName[0]?.toUpperCase()}</span>
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
            <section className="flex flex-col w-5/6 px-8 py-4 ">
                {/* NavBar */}
                <nav className="grid grid-cols-3 w-full h-16 ">
                    <div className="flex justify-self-start items-center">
                        <span className="text-4xl font-semibold">Overview</span>
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
                <section className="grid grid-cols-3 w-full place-content-between my-4 gap-16">
                    <div className="p-4 rounded-xl bg-green-200 flex flex-row gap-6 items-center">
                        <RiLineChartLine
                            size="4rem"
                            className="text-green-600"
                        />
                        <div className="w-full flex flex-col text-green-600">
                            <span className="text-4xl font-bold ">
                                $554.500
                            </span>
                            <h3 className="text-l block font-semibold">
                                VENTAS
                            </h3>
                        </div>
                    </div>
                    <div className="p-4 rounded-xl bg-orange-200 flex flex-row gap-6 items-center">
                        <HiOutlineUserGroup
                            size="4rem"
                            className="text-orange-600"
                        />
                        <div className="w-full flex flex-col text-orange-600">
                            <span className="text-4xl font-bold ">780</span>
                            <h3 className="text-l block font-semibold">
                                TICKETS VENDIDOS
                            </h3>
                        </div>
                    </div>
                    <div className="p-4 rounded-xl bg-fuchsia-200 flex flex-row gap-6 items-center">
                        <MdEventAvailable
                            size="4rem"
                            className="text-fuchsia-600"
                        />
                        <div className="w-full flex flex-col text-fuchsia-600">
                            <span className="text-4xl font-bold ">5</span>
                            <h3 className="text-l block font-semibold">
                                EVENTOS ACTIVOS
                            </h3>
                        </div>
                    </div>
                </section>

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
                            <option value="active_events" selected>
                                Eventos activos
                            </option>
                            <option value="pass_events">Eventos pasados</option>
                            <option value="all_eventos">
                                Todos los eventos
                            </option>
                        </select>
                    </div>
                </nav>
                <table className="w-full text-center">
                    <thead className="font-semibold border-b-4 border-fuchsia-600">
                        <tr>
                            <th scope="col" className="px-2 py-3">
                                Nombre
                            </th>
                            <th scope="col" className="px-2 py-3">
                                Fecha
                            </th>

                            <th scope="col" className="px-2 py-3">
                                Tickets disponibles
                            </th>
                            <th scope="col" className="px-2 py-3">
                                Opciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td
                                scope="row"
                                className="px-2 py-4 font-medium whitespace-nowrap"
                            >
                                <Link to="/detail" className="link">
                                    Miss Monique - 22.07 - Día del amigo
                                </Link>
                            </td>
                            <td className="px-2 py-4">22/07/2023 23:00hs</td>

                            <td className="px-2 py-4">983/5500</td>

                            <td className="px-2 py-4">
                                <div className="flex flex-row justify-center gap-6">
                                    <button>
                                        <MdDeleteOutline size="1.5rem" />
                                    </button>
                                    <button>
                                        <FaExchangeAlt size="1.5rem" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLogin: state.isLogin,
        userData: state.userData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
    };
};

  return (
    <div className="flex mt-14 "> 
     
    <button data-drawer-target="cta-button-sidebar" data-drawer-toggle="cta-button-sidebar" aria-controls="cta-button-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-white rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
   <span className="sr-only">Open sidebar</span>
   <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
    </button>


   <aside id="cta-button-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 mt-14 border-r-2 border-secondary  " aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-primary ">
       <ul className="space-y-2 font-medium mt-6 ">

       <li>
            <Link className={`flex items-center p-2 text-white rounded-lg  hover:bg-secondary hover:text-xl transition duration-1000 ease-out ${open == true? "bg-secondary": ""}`} >
               <svg className="h-6 w-6 text-white "  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
               <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="7" r="4" />  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
               <span className="flex-1 ml-3 whitespace-nowrap" onClick={()=> setOpen(!open)}>Usuario </span>
            </Link>
            <div className={`${!open && "hidden"} `}>
               <div >

               <div className={`ml-14 mb-1 mt-1 p-2 text-sm hover:text-base rounded-lg  hover:bg-secondary transition duration-1000 ease-out ${selectedView == "cart"? "bg-secondary": ""}`}>
                     <Link onClick={() => handleViewClick('perfil')}>
                     <svg class="h-6 w-6 text-white inline"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                     </svg>
                     <span className="flex-1 ml-3 whitespace-nowrap ">Perfil</span>
                     </Link> 
                  </div>

                                    <div
                                        className={`ml-14 mb-5 p-2 text-sm hover:text-base rounded-lg transition duration-1000 ease-out  hover:bg-secondary ${
                                            selectedView == "changepassword"
                                                ? "bg-secondary"
                                                : ""
                                        }`}
                                    >
                                        <Link
                                            onClick={() =>
                                                handleViewClick(
                                                    "changepassword"
                                                )
                                            }
                                            className={` `}
                                        >
                                            <svg
                                                className="h-6 w-6 text-white inline"
                                                width="24"
                                                height="24"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeLinejoin="round"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                                                />
                                            </svg>
                                            <span className="flex-1 ml-3 whitespace-nowrap">
                                                Contraseña
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <Link
                                className={`flex items-center p-2 text-white rounded-lg hover:bg-secondary hover:text-xl transition duration-1000 ease-out ${
                                    selectedView == "DashboardCard"
                                        ? "bg-secondary"
                                        : ""
                                }`}
                                onClick={() => handleViewClick("DashboardCard")}
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-6 h-6  text-white transition duration-75  group-hover:text-gray-900 "
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                </svg>
                                <span className="ml-3">Dashboard</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="#"
                                className={`flex items-center p-2 rounded-lg dark:text-white hover:bg-secondary  hover:text-xl transition duration-1000 ease-out ${
                                    selectedView == "ProducerEventDetail"
                                        ? "bg-secondary"
                                        : ""
                                }`}
                                onClick={() =>
                                    handleViewClick("ProducerEventDetail")
                                }
                            >
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 w-6 h-6 text-white transition duration-75  group-hover:text-gray-900 "
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap text-whit ">
                                    Detalle Evento
                                </span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                className={`flex items-center p-2 text-white rounded-lg hover:bg-secondary hover:text-xl transition duration-1000 ease-out ${
                                    selectedView == "EventTicketsCreate"
                                        ? "bg-secondary"
                                        : ""
                                }`}
                                onClick={() =>
                                    handleViewClick("EventTicketsCreate")
                                }
                            >
                                <svg
                                    className="h-6 w-6 text-white "
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    {" "}
                                    <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                    />{" "}
                                    <path d="M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4" />{" "}
                                    <line
                                        x1="14.5"
                                        y1="5.5"
                                        x2="18.5"
                                        y2="9.5"
                                    />{" "}
                                    <polyline points="12 8 7 3 3 7 8 12" />{" "}
                                    <line x1="7" y1="8" x2="5.5" y2="9.5" />{" "}
                                    <polyline points="16 12 21 17 17 21 12 16" />{" "}
                                    <line x1="16" y1="17" x2="14.5" y2="18.5" />
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Editar Evento
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`flex items-center p-2 text-white rounded-lg hover:bg-secondary hover:text-xl transition duration-1000 ease-out ${
                                    selectedView == "deleteEvent"
                                        ? "bg-secondary"
                                        : ""
                                }`}
                                onClick={() => handleViewClick("deleteEvent")}
                            >
                                <svg
                                    className="h-6 w-6 text-white"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Eliminar Evento
                                </span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                to={"/"}
                                className={`flex items-center p-2 text-white rounded-lg  hover:bg-secondary hover:text-xl `}
                            >
                                <svg
                                    className="h-6 w-6 text-white "
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                                    />
                                </svg>
                                <botton
                                    className="flex-1 ml-3 whitespace-nowrap"
                                    onClick={handleSignOut}
                                >
                                    Cerrar sesión
                                </botton>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>

            <div className="p-4 sm:ml-64 w-11/12">{renderContent()}</div>

