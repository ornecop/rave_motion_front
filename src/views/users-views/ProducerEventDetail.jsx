/* =======================================================
    VIEW ProducerEventDetail - "/dashboard/:eventName" - Vista de eventos para producers (detalle de ventas, etc)

    styles:
    Detalle de ventas de tickets y graficos 
    
*/

// Hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { connect } from "react-redux";

// Components
import EventDate from "../../components/EventDate";
import ProducerEventKeys from "../../components/ProducerEventKeys";

// Assets
import { AiOutlineCalendar } from "react-icons/ai";
import { ImLocation2 } from "react-icons/im";

// Axios
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ProducerEventDetail = ({ eventId, userData }) => {
    // Get event dashboard detail
    const [event, setEvent] = useState({});

    const navigate = useNavigate();
    useEffect(() => {
        const getEventsDetail = async () => {
            const response = await axios.get(
                `${BACKEND_URL}/tickets/sellstickets/${userData.id}`
            );

            const event = response.data[0].events.filter(
                (event) => event.eventId === eventId
            );
            if (!event[0].eventId === eventId) {
                navigate("/dashboard");
            } else {
                setEvent(event[0]);
            }
        };
        getEventsDetail();
    }, [eventId]);

    useEffect(() => {
        const totalTickets = 5;
    }, [event]);

    return (
        <section className="flex flex-col w-5/6 px-8 py-4 ">
            {event.name ? (
                <>
                    <div className="flex flex-row w-full h-16 justify-self-start items-center">
                        <span className="text-4xl font-semibold">
                            {event.name}
                        </span>
                    </div>

                    <div className="flex flex-row w-full items-center justify-start gap-2 text-fuchsia-600 font-semibold text-xl border-b border-secondaryBorder pb-4">
                        <AiOutlineCalendar size="1.75rem" />
                        <span className="">
                            <EventDate date={event.date} hour={event.hour} />
                        </span>
                    </div>
                    <ProducerEventKeys
                        totalSeLLs={event.totalAmount}
                        totalTicketsSells={event.totalTicketSells}
                        maxTickets="500"
                        daysToDate={5}
                    />
                </>
            ) : (
                <p>Not found</p>
            )}
        </section>
    );
};

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
    };
};

export default connect(mapStateToProps, null)(ProducerEventDetail);
