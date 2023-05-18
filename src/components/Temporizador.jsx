import { useState, useEffect } from 'react';

export default function Temporizador ({ duracion, onFinalizar }) {
    const [tiempoRestante, setTiempoRestante] = useState(duracion);
  
    // Función para actualizar el tiempo restante
    const actualizarTiempoRestante = () => {
      setTiempoRestante(prevTiempo => prevTiempo - 1);
    };
  
    useEffect(() => {
      // Actualiza el tiempo restante cada segundo
      const intervalo = setInterval(actualizarTiempoRestante, 1000);
  
      // Cuando el tiempo restante llega a cero, ejecuta la función onFinalizar
      if (tiempoRestante === 0) {
        onFinalizar();
        clearInterval(intervalo);
      }
  
      // Limpia el intervalo cuando el componente se desmonta
      return () => clearInterval(intervalo);
    }, [tiempoRestante, onFinalizar]);
  
    // Convierte el tiempo restante en minutos y segundos
    const minutos = Math.floor(tiempoRestante / 60);
    const segundos = tiempoRestante % 60;


    return(
    <div>{`${minutos}:${segundos < 10 ? '0' : ''}${segundos}`}</div>)
        
}