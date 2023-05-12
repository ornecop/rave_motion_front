import React from "react";
import CalendarFilter from "../../components/CalendarFilter";
import { useState } from "react";
import EventConteiner from '../../components/EventConteiner/EventConteiner'
/* =======================================================
    VIEW Home - "/" - Vista principal de la página

    styles:
    carrousel con imagenes de fiestas
    sección eventos destacados: filtros (por provincia, por productora) + orden (por fecha) + lista de eventos destacados 
    info de la pagina con link a about
    preguntas frecuentes
*/
const Home = () => {

    const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
    // const handleDateChange = (date) => {
    //   setSelectedDate(date);
    // };
  
    // // Función para filtrar los eventos por fecha
    // const filteredEvents = events.filter((event) => {
    //   // Comparar solo la fecha sin tener en cuenta la hora
    //   const eventDate = new Date(event.date);
    //   return (
    //     selectedDate &&
    //     eventDate.setHours(0, 0, 0, 0) === selectedDate.setHours(0, 0, 0, 0)
    //   );
    // });

    return (
    <div className="w-full flex flex-col">
        <div className="mt-32 md:max-h-screen">
            <select className="text-black" name="" id="">
                <option  disabled value="0">meses</option>
                <option value={1}>Enero</option>
                <option value={2}>Febrero</option>
                <option value={3}>Marzo</option>
                <option value={4}>Abril</option>
                <option value={5}>Mayo</option>
                <option value={6}>Junio</option>
                <option value={7}>Julio</option>
                <option value={8}>Agosto</option>
                <option value={9}>Septiembre</option>
                <option value={10}>Octubre</option>
                <option value={11}>Noviembre</option>
                <option value={12}>Diciembre</option>
            </select>
        </div>
        <CalendarFilter  startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}/>
<EventConteiner/>
    </div>);
};

export default Home;