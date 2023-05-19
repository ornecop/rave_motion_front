/* =======================================================
VIEW EventDetail - "/event/:eventName" - Vista a la que redirección al tocar un evento
*/
import React from "react";

// Hooks
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
    getEventById,
    removeEventDetail,
} from "../../redux/actions/eventsActions";

// Assets
import { AiOutlineCalendar } from "react-icons/ai";
import { ImLocation2 } from "react-icons/im";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

// Scroll
import { Link as ScrollLink } from "react-scroll";

// React router dom

// Comp buy

const SelectTickets = ({ ticket, handleTicketSelect }) => {
    const availableQ = ticket.maxQuantity - ticket.sells;
    console.log(ticket.price);

    if (availableQ && availableQ > 4) {
        return (
            <form>
                <select
                    className="inputSelect w-fit text-normal"
                    value={null}
                    onChange={handleTicketSelect}
                >
                    <>
                        <option id={ticket.id} name={ticket.price} value="0">
                            0
                        </option>
                        <option id={ticket.id} name={ticket.price} value="1">
                            1
                        </option>
                        <option id={ticket.id} name={ticket.price} value="2">
                            2
                        </option>
                        <option id={ticket.id} name={ticket.price} value="3">
                            3
                        </option>
                        <option id={ticket.id} name={ticket.price} value="4">
                            4
                        </option>
                    </>
                </select>
            </form>
        );
    } else if (availableQ && availableQ < 4) {
        let arr = [];
        for (let i = 1; i <= availableQ; i++) {
            arr.push(i);
        }
        return (
            <form>
                <select
                    className="inputSelect w-fit text-normal"
                    onChange={handleTicketSelect}
                >
                    <option selected value="0">
                        0
                    </option>
                    {arr.map((index) => (
                        <option
                            id={ticket.id}
                            key={ticket.id}
                            value={index}
                            name={ticket.price}
                        >
                            {index}
                        </option>
                    ))}
                </select>
            </form>
        );
    } else {
        return <span className="font-semibold text-red-400">SOLD OUT</span>;
    }
};

const EventDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const event = useSelector((state) => state.eventDetail);

    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getEventById(id));

        //setTimeout(() => !event.name && navigate("/notfound"), 2000);

        return () => {
            dispatch(removeEventDetail());
        };
    }, []);

    // Formateo de fecha y hour
    const date = new Date(event.date);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    const formatDate = `${day}-${month}-${year}`;

    const formatHour = event.hour ? event.hour.slice(0, 5) : "-";

    // Disponibilidad y valor minimo
    const availability = () => {
        const tickets = event.Tickets;

        const ticketsSells = tickets?.filter((t) => t.sells < t.maxQuantity);

        if (!ticketsSells?.length) {
            return "No quedan más entradas para este evento.";
        } else {
            return "Entradas disponibles";
        }
    };

    const tickets = event.Tickets;
    const ticketsMinPrice = () => {
        const ticketsSells = tickets
            ?.filter((t) => t.sells < t.maxQuantity)
            ?.map((t) => t.price);

        const minPrice = Math.min.apply(null, ticketsSells);
        return minPrice !== Infinity
            ? ` desde $${minPrice.toLocaleString("es")}.`
            : null;
    };

    const disponibles = availability();
    const minPrice = ticketsMinPrice();

    // Carrito de compra del evento
    const [selectedTickets, setSelectedTickets] = useState({});
    const [total, setTotal] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const handleTicketSelect = (event) => {
        const { id, value, name } = event.target;
        setSelectedTickets((prevState) => ({
            ...prevState,
            [id]: {
                quantity: Number(value),
                price: Number(name),
            },
        }));
    };

    return (
        <div className="w-screen">
            {/* Pantalla 1 -> Event Detail */}
            <div className="h-screen" id="event">
                {/* Separador del header */}
                <div className="h-16"></div>

                {/* Float Box con detalle y flecha */}
                <div className="my-auto min-h-[calc(100vh_-_4rem)] flex flex-col justify-center ">
                    {/* Detalle */}
                    <div className="floatBox md:w-2/3 h-fit mx-auto overflow-hidden font-sans bg-secondary">
                        {event.name ? (
                            <div className="h-full w-full flex flex-col">
                                {/* Name */}
                                <div className="flex flex-row w-full items-center justify-center pb-4 border-b border-secondaryBorder">
                                    <h2 className="text-4xl align-center font-semibold">
                                        {event.name}
                                    </h2>
                                </div>

                                {/* Image y data */}
                                <div className="flex flex-row w-full pt-4">
                                    {/* Image */}
                                    <div className="w-2/5 aspect-square rounded-xl">
                                        <div
                                            className="h-full w-full rounded-xl bg-cover bg-bottom bg-no-repeat"
                                            style={{
                                                backgroundImage: `url(${event.image})`,
                                            }}
                                            loading="lazy"
                                        ></div>
                                    </div>

                                    <div className="w-2/3 flex flex-col pl-4">
                                        <div className="flex flex-row items-center justify-start pb-4 gap-2 border-b border-secondaryBorder text-fuchsia-600 font-semibold text-xl">
                                            <AiOutlineCalendar size="1.75rem" />
                                            <span className="">
                                                {formatDate} - {formatHour}
                                            </span>
                                        </div>
                                        <div className="flex flex-row items-center justify-start py-4 gap-2 border-b border-secondaryBorder">
                                            <ImLocation2 size="1.3rem" />
                                            <span>
                                                <span className="font-semibold">
                                                    {event.producer}
                                                </span>{" "}
                                                - {event.venue}
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-center justify-start py-4 gap-2  border-b border-secondaryBorder">
                                            <span className="w-full font-semibold">
                                                DESCRIPCIÓN
                                            </span>
                                            <span className="w-full ">
                                                {event.description}
                                            </span>
                                        </div>
                                        <div className="flex flex-row items-center justify-start py-4 gap-2  border-b border-secondaryBorder">
                                            {disponibles}
                                            {minPrice}
                                        </div>
                                        <div className="flex flex-row items-center justify-start pt-4 px-8">
                                            <ScrollLink
                                                to="tickets"
                                                smooth={true}
                                                duration={200}
                                                className="w-full"
                                            >
                                                <button className="btnPrimary">
                                                    Comprar
                                                </button>
                                            </ScrollLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex w-full h-full items-center justify-center">
                                <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-fuchsia-600"></div>
                            </div>
                        )}
                    </div>

                    {/* Flecha abajo */}
                    <div className="flex flex-row w-full items-center justify-center py-4 gap-2 text-2xl text-fuchsia-600 font-semibold">
                        <ScrollLink to="tickets" smooth={true} duration={500}>
                            <FaArrowDown size="3rem" className="" />
                        </ScrollLink>
                        <ScrollLink to="tickets" smooth={true} duration={500}>
                            <span>TICKETS DEL EVENTO</span>
                        </ScrollLink>
                    </div>
                </div>
            </div>

            {/* Pantalla 2 -> Event Tickets*/}
            <div className="min-h-[calc(100vh_-_7rem)]" id="tickets">
                {/* Separador del header */}
                <div className="h-16"></div>

                {/* Flecha arriba */}
                <div className="flex flex-row w-full items-center justify-center py-4 gap-2 text-2xl text-fuchsia-600 font-semibold">
                    <ScrollLink to="event" smooth={true} duration={500}>
                        <span>DETALLE DEL EVENTO</span>
                    </ScrollLink>
                    <ScrollLink to="event" smooth={true} duration={500}>
                        <FaArrowUp size="3rem" className="" />
                    </ScrollLink>
                </div>

                {/* Float Box con tickets */}
                <div className="my-auto  flex flex-col justify-center ">
                    {/* Header tickets */}
                    <div className="floatBox md:w-2/3 h-fit mx-auto overflow-hidden font-sans bg-secondary">
                        {tickets?.length ? (
                            <>
                                <div className="flex flex-row w-full items-center justify-center pb-4 border-b border-secondaryBorder">
                                    <h2 className="text-4xl align-center font-semibold">
                                        Tickets:
                                    </h2>
                                </div>
                                {/* Tabla de tickets */}
                                <div className="flex flex-row w-full items-center justify-center pb-4 ">
                                    <table className="w-full text-start">
                                        <thead className="font-semibold border-b-4 border-fuchsia-600">
                                            <tr>
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
                                                    Tipo de acceso
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-2 py-3 text-start"
                                                >
                                                    Precio
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-2 py-3 text-center"
                                                >
                                                    Cantidad
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tickets?.map((ticket) => (
                                                <tr
                                                    className="border-b"
                                                    key={ticket.id}
                                                >
                                                    <td className="px-2 py-4">
                                                        {ticket.name}
                                                    </td>
                                                    <td className="px-2 py-4">
                                                        {ticket.accessType}
                                                    </td>

                                                    <td className="px-2 py-4">
                                                        ${" "}
                                                        {ticket.price.toLocaleString(
                                                            "es"
                                                        )}
                                                    </td>
                                                    <td className="px-2 py-4 text-center">
                                                        <SelectTickets
                                                            ticket={ticket}
                                                            handleTicketSelect={
                                                                handleTicketSelect
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr
                                                className="font-semibold border-y-4 border-fuchsia-600 rounded-md"
                                                key="sum"
                                            >
                                                <td className="px-2 py-4">
                                                    <button className="btnPrimary">
                                                        Comprar tickets
                                                    </button>
                                                </td>
                                                <td className="px-2 py-4 text-end">
                                                    Total:
                                                </td>

                                                <td className="px-2 py-4 text-start">
                                                    $ {total}
                                                </td>
                                                <td className="px-2 py-4 text-center">
                                                    {quantity}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        ) : (
                            <div className="flex w-full h-full items-center justify-center">
                                <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-fuchsia-600"></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetail;
