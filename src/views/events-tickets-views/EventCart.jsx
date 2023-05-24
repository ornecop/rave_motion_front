/* =======================================================
    VIEW EventCart - "/cart" - Vista a la que redirección al comprar un evento

    styles:
    evento y cantidad en el cart
    temporizador 10min
    iniciar sesion o registrarse en la misma view
    Seleccion medios de pago (Mercado Pago o Mercado Credito) 
    Boton comprar
    
*/

// Axios
import axios from "axios";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
initMercadoPago('TEST-2c22f2ae-6e1a-4d97-8e31-35aaa4167837');
// Hooks
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

// Actions
import {
    getEventById,
    removeEventDetail,
} from "../../redux/actions/eventsActions";

// Components
import Timer from "../../components/Timer";

// Consts
import { SECONDS_TO_PAY } from "../../const";

const EventCart = () => {
    // Global state
    const selectedTickets = useSelector((state) => state.selectedTickets);
    const dispatch = useDispatch();

    // Get event
    const { eventId } = useParams();
    const event = useSelector((state) => state.eventDetail);

    useEffect(() => {
        dispatch(getEventById(eventId));

        return () => {
            dispatch(removeEventDetail());
        };
    }, []);

    const [ticketsToPay, setTicketsToPay] = useState([]);

    const [serviceFee, setServiceFee] = useState(0);
    const [totalToPay, setTotalToPay] = useState(0);

    useEffect(() => {
        let aux = [];
        for (let ticketId in selectedTickets) {
            aux.push({
                id: ticketId,
                price: selectedTickets[ticketId].price,
                quantity: selectedTickets[ticketId].quantity,
                name: event.Tickets?.find((ticket) => ticket.id === ticketId)
                    .name,
            });
        }
        setTimeout(() => {
            setTicketsToPay(aux);
        }, 1000);
    }, [selectedTickets, event]);

    useEffect(() => {
        let totalTickets = 0;
        for (let ticket of ticketsToPay) {
            totalTickets += ticket.price * ticket.quantity;
        }
        setTimeout(() => {
            setServiceFee(totalTickets * 0.15);
            setTotalToPay(totalTickets + serviceFee);
        }, 1000);
    }, [ticketsToPay]);

    console.log(ticketsToPay);

    const handleTimerEnd = async () => {
        const response = await axios.get(`${BACKEND_URL}/events`);
        console.log(response);
    };

    //* Mercado Pago
    const [preferenceId,setPreferenceId]=useState(null);
    useEffect(()=>{
        let MPbody={name:event.name, price:totalToPay}
        if(totalToPay>0){
            axios.post('http://localhost:3001/payments',MPbody)
            .then(response=>{
                console.log(response.data.preference_id);
                setPreferenceId(response.data.preference_id)
            })
            .catch(error=>console.log({MPerror:error}))
        }
        
    },[totalToPay])

    return (
        <div className="w-full">
            <div className="h-16"></div>

            <div className="my-auto min-h-[calc(100vh_-_4rem)] flex flex-col gap-6 justify-center">
                <div className="floatBox md:w-2/3 h-fit mx-auto overflow-hidden font-sans bg-secondary">
                    <div className="flex flex-row w-full items-center justify-center pb-4 border-b border-secondaryBorder">
                        <h2 className="text-3xl align-center font-semibold">
                            {event.name}
                        </h2>
                    </div>
                    <div className="flex flex-row w-full items-center justify-center pb-4 border-b border-secondaryBorder">
                        <h2 className="text-3xl align-center font-semibold">
                            Estas a punto de comprar los siguientes tickets:
                        </h2>
                    </div>
                    {ticketsToPay.length ? (
                        <>
                            {/* Tabla de tickets */}
                            <div className="flex flex-row w-full items-center justify-center pb-4 ">
                                <table className="w-full text-start ">
                                    <thead className="font-semibold border-b-4 border-fuchsia-600">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-2 py-3  text-start"
                                            >
                                                Nombre del ticket
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
                                            <th
                                                scope="col"
                                                className="px-2 py-3 text-center"
                                            >
                                                Subtotal
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ticketsToPay?.map((ticket) => (
                                            <tr
                                                className="border-b"
                                                key={ticket.id}
                                            >
                                                <td className="px-2 py-4 text-start">
                                                    {ticket.name}
                                                </td>
                                                <td className="px-2 py-4 text-start">
                                                    ${" "}
                                                    {ticket.price.toLocaleString(
                                                        "es"
                                                    )}
                                                </td>
                                                <td className="px-2 py-4 text-center">
                                                    {ticket.quantity}
                                                </td>
                                                <td className="px-2 py-4 text-center">
                                                    ${" "}
                                                    {(
                                                        ticket.quantity *
                                                        ticket.price
                                                    ).toLocaleString("es")}
                                                </td>
                                            </tr>
                                        ))}
                                        <tr
                                            className="font-semibold border-t-4 border-fuchsia-600 rounded-md"
                                            key="sum"
                                        >
                                            <td className="px-2 py-4">
                                                Cargo por servicio:
                                            </td>
                                            <td className="px-2 py-4 text-end">
                                                ${" "}
                                                {serviceFee.toLocaleString(
                                                    "es"
                                                )}
                                            </td>

                                            <td className="px-2 py-4 text-start"></td>
                                            <td className="px-2 py-4 text-center">
                                                ${" "}
                                                {totalToPay.toLocaleString(
                                                    "es"
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <div className="flex w-full h-full items-center justify-center my-6">
                            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-fuchsia-600"></div>
                        </div>
                    )}
                </div>
                <div className="floatBox md:w-2/3 h-fit mx-auto overflow-hidden font-sans bg-secondary">
                    <Timer
                        seconds={SECONDS_TO_PAY}
                        handleTimerEnd={handleTimerEnd}
                    />
                </div>
                <div className="floatBox md:w-2/3 h-fit mx-auto overflow-hidden font-sans bg-secondary">
                {preferenceId && <Wallet className='px-6' initialization={{ preferenceId:preferenceId }} />}
                </div>
            </div>
        </div>
    );
};

export default EventCart;