import React, { useEffect } from "react";
/* =======================================================
    VIEW EventDetail - "/event/:eventName" - Vista a la que redirección al tocar un evento
*/

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
    getEventById,
    removeEventDetail,
} from "../../redux/actions/eventsActions";

// Assets
import { AiOutlineCalendar } from "react-icons/ai";
import { ImLocation2 } from "react-icons/im";
import { FaArrowDown } from "react-icons/fa";

// Scroll
import { Link as ScrollLink } from "react-scroll";

// React router dom
import { Link, useParams } from "react-router-dom";

const EventDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const event = useSelector((state) => state.eventDetail);

    useEffect(() => {
        dispatch(getEventById(id));

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

    const ticketsMinPrice = () => {
        const tickets = event.Tickets;

        const ticketsSells = tickets
            ?.filter((t) => t.sells < t.maxQuantity)
            ?.map((t) => t.price);

        const minPrice = Math.min.apply(null, ticketsSells);
        console.log(minPrice);
        return minPrice !== Infinity
            ? ` desde $${minPrice.toLocaleString("es")}.`
            : null;
    };

    const disponibles = availability();
    const minPrice = ticketsMinPrice();

    return (
        <div className="w-screen">
            {/* Pantalla 1 -> Event Detail */}
            <div className="h-screen">
                {/* Separador del header */}
                <div className="h-16"></div>

                {/* Float Box con detalle y flecha */}
                <div className="my-auto min-h-[calc(100vh_-_4rem)] flex flex-col justify-center ">
                    {/* Detalle */}
                    <div className="floatBox md:w-2/3 h-fit mx-auto overflow-hidden font-sans bg-secondary">
                        <div className="h-full w-full flex flex-col">
                            {/* Name */}
                            <div className="flex flex-row w-full items-center justify-center pb-4 border-b border-secondaryBorder">
                                <h2 className="text-5xl align-center font-semibold">
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
                                            duration={500}
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
                    </div>
                    <div className="flex flex-row w-full items-center justify-center py-4 gap-2 text-2xl text-fuchsia-600 font-semibold">
                        <ScrollLink to="tickets" smooth={true} duration={500}>
                            <FaArrowDown size="3rem" className="" />
                        </ScrollLink>
                        <ScrollLink to="tickets" smooth={true} duration={500}>
                            <span>Ver tickets del evento</span>
                        </ScrollLink>
                    </div>
                </div>
            </div>
            {/* Pantalla 2 -> Event Tickets*/}
            <div className="h-screen" id="tickets">
                {/* Separador del header */}
                <div className="h-16"></div>

                {/* Float Box con detalle y flecha */}
                <div className="my-auto min-h-[calc(100vh_-_7rem)] flex flex-col justify-center ">
                    {/* Detalle */}
                    <div className="floatBox md:w-2/3 h-fit mx-auto overflow-hidden font-sans bg-secondary"></div>
                </div>
            </div>
        </div>
    );
};

export default EventDetail;

/*
 <div className="min-h-screen" id="tickets">
                <div className="mt-6 bg-secondary">
                    <div className="px-4 pt-3 pb-2 text-white">Tickets</div>
                    {event.Tickets &&
                        event.Tickets.map((ticket, index) => (
                            <div
                                key={index}
                                className="p-4 mt-4 bg-primary rounded-xl"
                            >
                                <div className="px-4 py-3">
                                    <div className="text-sm font-semibold text-white">
                                        Name: {ticket.name}
                                    </div>
                                    <p className="mt-1 text-sm text-white">
                                        Access Type: {ticket.accessType}
                                    </p>
                                    <p className="mt-1 text-sm text-white">
                                        Price: {ticket.price}
                                    </p>
                                    <p className="mt-1 text-sm text-white">
                                        {ticket.maxQuantity} / {ticket.sells}
                                    </p>
                                    <p className="mt-1 text-sm text-white">
                                        Description: {ticket.description}
                                    </p>
                                    <Link to={`/cart/${ticket.id}`}>
                                        <button className="mt-3 bg-white hover:bg-gray-200 text-primary font-bold py-2 px-4 rounded">
                                            Comprar
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
*/
