import React from "react";

/* =======================================================
    VIEW EventDetail - "/event/:eventName" - Vista a la que redirección al tocar un evento


    styles:
    nombre, desc, imagen, time, hour, venue, produccer
    tickets types c opción de compra y cantidad
    
*/

// Hooks
import { useParams } from "react-router-dom";

// React Icons
import { AiOutlineCalendar } from "react-icons/ai";

// Event
const event = {
    id: "5f366c0a-36c0-4f3f-ae4a-c21e7114fd53",
    userId: "48ee4976-c98e-4fca-b4d9-7431ee7c923e",
    name: "Megajodita2",
    image: "https://res.cloudinary.com/dv8oxhsmk/image/upload/v1683816264/vpokk5tyxuxt6osewvho.jpg",
    description:
        "en la pera Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit adipisci eaque voluptas mollitia laudantium laborum accusamus saepe maiores possimus blanditiis temporibus, amet perspiciatis quos, iure earum esse ullam tempora beatae?    ",
    date: "2024-09-20",
    hour: "02:00:00",
    venue: "Calle Falsa 456",
    producer: "The Bow",
    status: true,
    createdAt: "2023-05-11T14:44:21.171Z",
    updatedAt: "2023-05-11T14:44:21.171Z",
    UserId: null,
};

const eventTickets = [
    {
        id: "dfa7a221-ea0c-4fc0-902c-1215c49cc5cc",
        eventId: "dfcbe5f0-1132-40d5-85ec-43e18441e69a",
        name: "Tanda 1",
        description: "aaaa",
        accessType: "vip",
        price: 5000,
        maxQuantity: 100,
        sells: 100,
        status: true,
    },
    {
        id: "dfa7a221-ea0c-4fc0-902c-1215c49cc5cc",
        eventId: "dfcbe5f0-1132-40d5-85ec-43e18441e69a",
        name: "Tanda 2",
        description: "aaaa",
        accessType: "vip",
        price: 12000,
        maxQuantity: 500,
        sells: 480,
        status: true,
    },
    {
        id: "dfa7a221-ea0c-4fc0-902c-1215c49cc5cc",
        eventId: "dfcbe5f0-1132-40d5-85ec-43e18441e69a",
        name: "Tanda 3",
        description: "aaaa",
        accessType: "vip",
        price: 20000,
        maxQuantity: 3000,
        sells: 0,
        status: true,
    },
];

const EventDetail = (props) => {
    const { eventId } = useParams();
    return (
        <div className="w-screen h-min-[calc(100vh_-_3rem)] ">
            {/* Margin top */}
            <div className="w-screen h-16"></div>

            {/* Screen Event Data */}
            <div className="h-[calc(100vh_-_7rem)] flex items-center justify-between px-16 pt-16">
                {/* Event Detail */}
                <div className="w-full h-full floatBox m-16 gap-4">
                    {/* Name & date */}
                    <div className="w-5/6">
                        <h1 className="text-5xl  font-medium">{event.name}</h1>
                        <div className="flex flex-row items-center gap-2 text-fuchsia-600">
                            <AiOutlineCalendar size="1.3rem" />
                            <span className="font-semibold">
                                {event.date} - {event.hour}
                            </span>
                        </div>
                    </div>
                    <div className="w-1/6">
                        <span className="font-semibold">{event.producer}</span>{" "}
                        - {event.venue}
                    </div>
                    {/* Description */}
                    <div>
                        <p>{event.description}</p>
                    </div>
                </div>
            </div>

            {/* Screen tickets data */}
            <div className=" flex items-center justify-between px-16 pt-16">
                {/* Right Event Detail */}
                <div className="w-3/6 h-full bg-fuchsia-500">
                    <h1 className="text-6xl">{event.name}</h1>
                </div>
                {/* Left Event Detail */}
                <div className="w-3/6 h-full bg-secondary"></div>
            </div>
        </div>
    );
};

export default EventDetail;
