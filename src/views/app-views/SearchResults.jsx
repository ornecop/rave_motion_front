import React from "react";
import EventContainer from "../../components/EventContainer";
import { connect } from "react-redux";
/* =======================================================
    VIEW SearchResults - "/search/:searchedName" - Vista a la que redirección al buscar algo en el searchbar

    * El back puede traer un array de eventos

    styles:
    filtros (por provincia, por productora) + orden (por fecha) 
    lista de eventos encontrados 

*/
// const events = useSelector((state) => state.searchResult);



const SearchResults = ({events}) => {
    console.log(events)


    return (
        <div className="w-full min-h-screen m-0">
            <div className="flex justify-center items-center h-screen">
            { 
                events.length === 0 ? (<div><h1 className="font-bold text-center text-5xl">LO SENTIMOS</h1><h1  className="text-white text-xl  text-center ">no se han encontrado resultados</h1></div>)
                : (<div><EventContainer events={events} /></div>)
            }
            </div>
        </div>
    );
};



const mapStateToProps = (state) => {
    return{
        events: state.searchResult,  
    }
}
export default connect(mapStateToProps, null)(SearchResults);
