import axios from "axios";
import { useParams } from "react-router-dom";
import Temporizador from "../../components/Temporizador";
import { useEffect } from "react";
import { useSelector } from "react-redux";

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
    const duracion = 600;
    const selectedTickets=useSelector(state=>state.selectedTickets);
    async function alFinalizar() {
        const response = await axios.get(`${BACKEND_URL}/events`);
        console.log(response);
    }

    console.log(duracion);

    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <div className=" flex flex-col w-4/6 justify-center items-center bg-secondary rounded-xl border border-secondaryBorder">
                <div className="text-center mt-9 text-xl">
                    <Temporizador
                        duracion={duracion}
                        onFinalizar={alFinalizar}
                    />
                </div>
                <div className="text-center">
                    tiempo restante para realizar tu compra
                </div>
                <div className="text-black min-w-full">
                    <form
                        action=""
                        className="min-w-full flex flex-row justify-center"
                    >
                        <label htmlFor="" className="text-white m-9 mr-3">
                            cantidad de tickets:{" "}
                        </label>
                    </form>
                    <button>Mercado Pago</button>
                </div>
            </div>
        </div>
    );
};

export default EventCart;
