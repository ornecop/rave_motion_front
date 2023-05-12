import React from "react";
import { useSelector } from "react-redux";
import { MdLocationOn, MdDateRange, MdWatch } from "react-icons/md";
import {Link} from "react-router-dom"
/* =======================================================
    VIEW EventDetail - "/event/:eventName" - Vista a la que redirección al tocar un evento
*/
const EventDetail = () => {
    const event = {
        id: "6d3da6bd-2790-43ac-ba64-d4789cd9e992",
        userId: "4612c406-466f-4d47-83ef-251509e42395",
        name: "Megajodita2",
        image: "https://res.cloudinary.com/dv8oxhsmk/image/upload/v1683899507/krugv05mtxkt0psktvqm.jpg",
        description: "en la pera",
        date: "15-05-2023",
        hour: "02:00:00",
        venue: "Calle Falsa 456",
        producer: "The Bow",
        status: true,
        createdAt: "2023-05-12T13:51:45.083Z",
        updatedAt: "2023-05-12T13:51:45.083Z",
        UserId: null,
        Tickets: [
         {
          id: "bd5ca531-520d-49f4-bcfa-dcd19b0f49a8",
          eventId: "6d3da6bd-2790-43ac-ba64-d4789cd9e992",
          name: "Tanda 3",
          description: "aaaa",
          accessType: "vip",
          price: 200,
          maxQuantity: 2,
          sells: 0,
          status: true
         },
         {
          id: "51348888-707b-404d-99b5-101a4f3e33f8",
          eventId: "6d3da6bd-2790-43ac-ba64-d4789cd9e992",
          name: "Tanda 4",
          description: "aaaa",
          accessType: "vip",
          price: 200,
          maxQuantity: 3,
          sells: 0,
          status: true
         }
        ]
       } 

       return (
        <div className="floatBox max-w-md mx-auto rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 font-sans bg-secondary">
            {/* Detalles del evento */}
            <div className="p-4 bg-secondary text-center">
                {event.image && <img className="w-full rounded" src={event.image} alt={event.name} />}
                <div className="p-4">
                    <div className="uppercase tracking-wide text-3xl font-semibold text-white">{event.name}</div>
                    <p className="mt-2 text-white flex justify-center items-center"><MdLocationOn /> Venue: {event.venue}</p>
                    <p className="mt-2 text-white flex justify-center items-center"> Producer: {event.producer}</p>
                    <p className="mt-2 text-white flex justify-center items-center"><MdDateRange /> Date: {event.date}</p>
                    <p className="mt-2 text-white flex justify-center items-center"><MdWatch /> Hour: {event.hour}</p>
                    <div className="mt-4 p-2 rounded">
                        <p className="text-white text-lg leading-relaxed">{event.description}</p>
                    </div>
                </div>
            </div>

            {/* Lista de tickets */}
            <div className="mt-4 bg-secondary">
                <div className="px-4 pt-3 pb-2 text-white">Tickets</div>
                {event.Tickets.map((ticket, index) => (
                    <div key={index} className="p-4 mt-4 bg-primary rounded-xl">
                        <div className="px-4 py-3">
                            <div className="text-sm font-semibold text-white">Name: {ticket.name}</div>
                            <p className="mt-1 text-sm text-white">Description: {ticket.description}</p>
                            <p className="mt-1 text-sm text-white">Access Type: {ticket.accessType}</p>
                            <p className="mt-1 text-sm text-white">Price: {ticket.price}</p>
                            <p className="mt-1 text-sm text-white">Max Quantity: {ticket.maxQuantity}</p>
                            <p className="mt-1 text-sm text-white">Sells: {ticket.sells}</p>
                            <p className="mt-1 text-sm text-white">Description: {ticket.description}</p>
                            <Link to="/cart">
                            <button className="mt-3 bg-white hover:bg-gray-200 text-primary font-bold py-2 px-4 rounded" >
                                Comprar
                            </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventDetail;