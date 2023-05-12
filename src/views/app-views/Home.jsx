import React from "react";
import CalendarFilter from "../../components/CalendarFilter";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
    const filtros = useSelector(state => state.event )
    const dispatch = useDispatch();

        const HandllerSend =(startDate, endDate)=>{
            dispatch("") //! dispatch de la action 
        } 

    return (    
    <div className="w-full flex flex-col " >
        <div className="mt-20 md:max-h-screen">
        </div>
        <div className="bg-secondary">
            <CalendarFilter  startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}/>
            <button className=" " onClick={()=>{HandllerSend(startDate, endDate)}}>Send</button>
        </div>
        <EventConteiner/>
    </div>);
};

export default Home;