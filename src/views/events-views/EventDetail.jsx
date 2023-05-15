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

    return (
        <div className="w-screen">
            <div className="h-96 relative overflow-hidden">
                <div
                    className="h-full w-full absolute top-0 left-0 bg-center bg-repeat-x "
                    style={{
                        backgroundImage: `url(${event.image})`,
                    }}
                ></div>
            </div>

            <div className="floatBox max-w-md mx-auto rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 font-sans bg-secondary">
                <div className="h-32 flex items-center justify-center ">
                    <h2 className="text-4xl text-center align-center font-semibold">
                        {event.name}
                    </h2>
                </div>
                {/* Detalles del evento */}
                <div className=" flex flex-col text-center">
                    <div className="h-96 w-96 rounded-xl border border-secondaryBorder self-center">
                        <div
                            className="h-full w-full bg-cover bg-bottom bg-no-repeat place-content-center rounded-xl"
                            style={{
                                backgroundImage: `url(${event.image})`,
                            }}
                        ></div>
                    </div>
                    <div className="p-4">
                        <div className="flex flex-row justify-center items-center gap-2 mt-4">
                            <ImLocation2 size="1.3rem" />
                            <span>
                                <span className="font-semibold">
                                    {event.producer}
                                </span>{" "}
                                - {event.venue}
                            </span>
                            <div className="w-4 font-semibold"></div>
                            <AiOutlineCalendar size="1.3rem" />
                            <span className="">
                                {formatDate} - {formatHour}
                            </span>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-2 mt-4 w-full min-h-fit overflow-y-scroll">
                            {event.description}
                        </div>
                    </div>
                </div>

                {/* Lista de tickets */}
                <div className="mt-4 bg-secondary">
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
                                        Description: {ticket.description}
                                    </p>
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
                                    <Link to="/cart">
                                        <button className="mt-3 bg-white hover:bg-gray-200 text-primary font-bold py-2 px-4 rounded">
                                            Comprar
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default EventDetail;
