/* =======================================================
    VIEW UserTickets - "/tickets" - Vista con los tickets del user logeado

    * Vista solo para user logeado

    styles:
    filtro (todos los eventos, eventos pasados, eventos activos) + orden 
    lista de tickets con acciones (detalle de compra, eTicket, reenviar a usuario) 
    
    * Las acciones hacen que aparezcan alerts con el detalle de la accion
    
*/

// Redux
import { connect } from "react-redux";

// Hooks
import { useState } from "react";

const UserTickets = ({ userData }) => {
    const userTickets = [];

    // Filter events
    const [filterByDate, setFilterByDate] = useState("active_events");

    const handleFilter = (event) => {
        setFilterByDate(event.target.value);
    };

    return (
        <div className="w-screen h-[calc(100vh_-_3rem)]">
            <div className="h-16 w-screen block"></div>
            <section className="flex flex-col px-8 py-4 ">
                {/* NavBar */}
                <nav className="grid grid-cols-2 w-full h-16 ">
                    <div className="flex justify-self-start items-center">
                        <span className="text-4xl font-semibold">
                            Tus tickets
                        </span>
                    </div>

                    <div className="flex justify-self-end items-center gap-6">
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
                        <div className="bg-slate-500 rounded-full w-12 h-12 flex justify-center items-center text-2xl font-semibold">
                            <span>
                                {userData?.firstName &&
                                    userData.firstName[0].toUpperCase()}
                            </span>
                        </div>
                    </div>
                </nav>

                {/* Tickets */}

                <div className="overflow-auto mt-4 scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded">
                    <table className="w-full text-start bg-secondary border border-secondaryBorder mx-2 my-4 mb-8">
                        <thead className="font-semibold border-b-4 border-fuchsia-600">
                            <tr className="">
                                <th
                                    scope="col"
                                    className="px-2 py-3 text-start"
                                >
                                    Evento
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
                                    Tickets comprados
                                </th>
                                <th
                                    scope="col"
                                    className="px-2 py-3 text-center"
                                >
                                    Opciones tickets
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {userTickets ? (
                                userTickets.map((ticket) => (
                                    <tr className="border-b" key={ticket.id}>
                                        <td
                                            scope="row"
                                            className="px-2 py-4 font-semibold whitespace-nowrap"
                                        >
                                            {ticket.name}
                                        </td>
                                        <td className="px-2 py-4"></td>

                                        <td className="px-2 py-4 text-center"></td>

                                        <td className="px-2 py-4 justify-center">
                                            <div className="flex flex-row gap-6 items-center justify-center"></div>
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
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(UserTickets);
