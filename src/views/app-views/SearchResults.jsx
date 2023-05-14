import React from "react";
import { useSelector } from "react-redux";
import EventContainer from "../../components/EventContainer";

/* =======================================================
    VIEW SearchResults - "/search/:searchedName" - Vista a la que redirección al buscar algo en el searchbar

    * El back puede traer un array de eventos

    styles:
    filtros (por provincia, por productora) + orden (por fecha) 
    lista de eventos encontrados 

*/
const SearchResults = () => {
    const events = useSelector((state) => state.searchResult);

    return (
        <div>
            <EventContainer events={events} />
        </div>
    );
};

export default SearchResults;
