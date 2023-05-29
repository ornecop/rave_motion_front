// Hooks
import { useState, useEffect } from "react";

// Redux
import { connect } from "react-redux";

// Components
import EventContainer from "../../components/EventContainer";
import Loading from "../../components/Loading";

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
                    <Loading />
                ) : events.length === 0 ? (
                    <div>
                        <h1 className="font-bold text-center text-5xl">
                            LO SENTIMOS
                        </h1>
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
