import axios from "axios";
import { useParams } from "react-router-dom";
import Temporizador from "../../components/Temporizador";
import { useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
/* =======================================================
    VIEW EventCart - "/cart" - Vista a la que redirección al comprar un evento

    styles:
    evento y cantidad en el cart
    temporizador 10min
    iniciar sesion o registrarse en la misma view
    Seleccion medios de pago (Mercado Pago o Mercado Credito) 
    Boton comprar
    
*/
const EventCart = () => {
  const { ticketId } = useParams();
  console.log(ticketId)
  const [iniciar, setIniciar] = useState(false);
  const [tickets, setTickets] = useState(1);
  const [reserva, setReserva] = useState(false);
  const duracion = 10;

  const handlerTickets = (e) =>{
    const value = e.target.value;
    setTickets(value);
  }
  const submitTickets = async () =>{
    try{
    setIniciar(true);
    const ticketsNumber = {reservation: Number(tickets)}
    console.log(typeof(tickets))
    const response = await axios.put(`http://localhost:3001/tickets/setsumstock/${ticketId}`,ticketsNumber)
    if(response){setReserva(true);}
    console.log(response, "esta response")}
    catch(error){console.log(error)}
  }

  async function alFinalizar() {
    const ticketsNumber = {reservation: Number(tickets)}
    if(reserva===true){const response = await axios.put(`http://localhost:3001/tickets/substracksells/${ticketId}`,ticketsNumber);
    console.log(response);}
  }

  console.log(duracion);
  console.log(tickets)

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className=" flex flex-col w-4/6 justify-center items-center bg-secondary rounded-xl border border-secondaryBorder">
        <div className=" min-w-full">
          <form action="" className="min-w-full flex flex-row justify-center">
            <label htmlFor="" className="text-white m-9 mr-3">
              cantidad de tickets:{" "}
            </label>
            <select onChange={handlerTickets} name="" id="" defaultValue={1} className="w-44 m-9 mr-3 text-black">
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
            </select>
          </form>
          <div className="text-center flex justify-center">
            <button
              className="rounded-xl border bg-slate-50 text-black w-24 text-xl hover:bg-primary hover:text-white"
              onClick={submitTickets}
            >
              iniciar
            </button>
          </div>
          {iniciar ? (
            <div className="text-center mt-9 mb-9 flex justify-center">
              <Temporizador duracion={duracion} onFinalizar={alFinalizar} />
            </div>
          ) : (
            <div className="text-center mb-9">
              dale a iniciar para seguir con tu compra
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCart;
