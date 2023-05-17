import React from "react";
import { useEffect, useState} from "react";
// import { useTimer } from "react-timer-hook";

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
    const [seconds, setSeconds] = useState(10 * 60);

  useEffect(() => {
    let interval = null;

    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      myFunction();
    }

    return () => clearInterval(interval);
  }, [seconds]);

  const myFunction = () => {
    console.log('El temporizador ha llegado a cero. Ejecutando mi función.');
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
        <div className=" flex flex-col w-4/6 justify-center items-center bg-secondary">
            <div className="text-center">Time: {formatTime(seconds)}</div>
            <div className="text-black">
            <form action="">
                <label htmlFor="" className="text-white">cantidad de tickets: </label>
                <select name="" id="">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option></select>
            </form>
            </div>
        </div>
    </div>
  );
};

export default EventCart;
