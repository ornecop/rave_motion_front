import { useState, useEffect } from "react";

export default function Timer({ seconds, handleTimerEnd }) {
    const [tiempoRestante, setTiempoRestante] = useState(seconds);

    // Función para actualizar el tiempo restante
    const actualizarTiempoRestante = () => {
        setTiempoRestante((prevTiempo) => prevTiempo - 1);
    };

    useEffect(() => {
        // Actualiza el tiempo restante cada segundo
        const intervalo = setInterval(actualizarTiempoRestante, 1000);

        // Cuando el tiempo restante llega a cero, ejecuta la función onFinalizar
        if (tiempoRestante === 0) {
            handleTimerEnd();
            clearInterval(intervalo);
        }

        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(intervalo);
    }, [tiempoRestante, handleTimerEnd]);

    // Convierte el tiempo restante en minutos y segundos
    const minutos = Math.floor(tiempoRestante / 60);
    const segundos = tiempoRestante % 60;

    return (
        <div className="text-center w-full">
            {tiempoRestante === 0 ? (
                <div className="text-3xl font-semibold">
                    Su tiempo estimado para comprar el ticket a caducado
                </div>
            ) : (
                <div className="text-xl font-semibold">
                    Tiempo restante para realizar su compra:
                </div>
            )}
            <div className="text-3xl font-semibold mt-6">{`${minutos}:${
                segundos < 10 ? "0" : ""
            }${segundos}`}</div>
        </div>
    );
}
