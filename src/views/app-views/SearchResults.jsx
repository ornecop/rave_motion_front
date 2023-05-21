import React, { useState, useEffect } from "react";
import EventContainer from "../../components/EventContainer";
import { connect } from "react-redux";

const SearchResults = ({ events }) => {

//loading
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    setTimeout(() => {
    setIsLoading(false);
    }, 2000);
}, []);

  return (
    <div className="w-full min-h-screen m-0">
      <div className="flex justify-center items-center h-screen">
        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-fuchsia-600"></div>
            <h1 className="font-bold text-center text-2xl mt-4">Loading...</h1>
          </div>
        ) : events.length === 0 ? (
          <div>
            <h1 className="font-bold text-center text-5xl">LO SENTIMOS</h1>
            <h1 className="text-white text-xl text-center">
              No se han encontrado resultados
            </h1>
          </div>
        ) : (
          <div>
            <EventContainer events={events} />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    events: state.searchResult,
  };
};

export default connect(mapStateToProps, null)(SearchResults);
