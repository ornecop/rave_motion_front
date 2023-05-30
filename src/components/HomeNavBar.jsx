// Assets
import { FaSync } from "react-icons/fa";

// Hooks
import { useState, useEffect } from "react";

// React Redux
import { connect } from "react-redux";
import {
    setAllEventsOnHomeEvents,
    setDateToFilter,
    filterEventsByDate,
    filterEventsByProducer,
    sortEvents,
} from "../redux/actions/eventsActions";

// Functions
import setProducer from "../functions/setProducer";
import getCurrentDate from "../functions/getCurrentDate";
// Const
import { FILTER_TYPES, SORT_TYPES } from "../const";

const HomeNavBar = (props) => {
    // Props
    const { totalPages } = props;

    // Global State
    const {
        allEvents,
        homeEvents,
        homeFilterByProducer,
        homeFilterByDate,
        homeSort,
        currentPage,
    } = props;

    // Actions
    const {
        setAllEventsOnHomeEvents,
        setDateToFilter,
        filterEventsByDate,
        filterEventsByProducer,
        sortEvents,
    } = props;

    // Filter by Date
    const handleFilterByDateChange = (event) => {
        //
        if (event.target.name === "startDate")
            setDateToFilter({
                startDate: event.target.value,
                endDate: homeFilterByDate.endDate,
            });
        if (event.target.name === "endDate")
            setDateToFilter({
                endDate: event.target.value,
                startDate: homeFilterByDate.startDate,
            });
    };

    const handleSubmitFilterEvents = () => {
        filterEventsByDate();
    };

    // Filter by Producer
    const handleFilterByProducer = (event) => {
        filterEventsByProducer(event.target.value);
    };

    // Sort
    const handleSortEvents = (event) => {
        sortEvents(event.target.value);
    };

    // Reset
    function handleResetFilters() {
        setAllEventsOnHomeEvents();
    }
    return (
        <div className="grid grid-cols-2 w-screen h-16 mt-4">
            <div className="flex w-fit justify-self-start my-2 items-center gap-6 py-1 px-4 bg-secondary rounded-full border border-secondaryBorder ml-4">
                {/* Filter by producer */}
                <div className="flex flex-row gap-2 items-center">
                    <select
                        className="inputSelect w-fit"
                        onChange={handleFilterByProducer}
                        value={homeFilterByProducer}
                    >
                        {" "}
                        <option value={FILTER_TYPES.BY_PRODUCER.ALL}>
                            Todas las productoras
                        </option>
                        {setProducer(allEvents).map((c) => {
                            return (
                                <option id={c} value={c} key={c}>
                                    {c}
                                </option>
                            );
                        })}
                    </select>
                </div>

                {/* Filter by Date */}
                <div className="flex flex-row gap-2 items-center">
                    <label htmlFor="startDate">Desde:</label>
                    <input
                        type="date"
                        className="input"
                        name="startDate"
                        onChange={handleFilterByDateChange}
                        value={homeFilterByDate.startDate}
                        min={getCurrentDate()}
                    />
                    <label htmlFor="endDate">Hasta:</label>
                    <input
                        type="date"
                        className="input"
                        name="endDate"
                        onChange={handleFilterByDateChange}
                        value={homeFilterByDate.endDate}
                        min={homeFilterByDate.startDate}
                    />
                    <button
                        className="btnPrimary h-8 py-0 px-4 w-fit"
                        onClick={handleSubmitFilterEvents}
                    >
                        Filtrar
                    </button>
                </div>

                {/* Sort */}
                <div className="flex flex-row gap-2 items-center">
                    <label htmlFor="sort">Ordenar:</label>

                    <select
                        value={homeSort}
                        onChange={handleSortEvents}
                        className="inputSelect w-fit"
                        name="sort"
                    >
                        <option value={SORT_TYPES.DEFAULT}>Default</option>
                        <option value={SORT_TYPES.BY_ALPHABETIC.ASC}>
                            A-Z
                        </option>
                        <option value={SORT_TYPES.BY_ALPHABETIC.DESC}>
                            Z-A
                        </option>
                        <option value={SORT_TYPES.BY_DATE.FIRST}>
                            Próximos
                        </option>
                        <option value={SORT_TYPES.BY_DATE.LAST}>Últimos</option>
                    </select>
                </div>

                <button
                    className="btnPrimary px-2"
                    onClick={handleResetFilters}
                >
                    <FaSync />
                </button>
            </div>

            {/* Info paginado */}
            <div className="flex w-fit justify-self-end my-2 items-center gap-6 py-1 px-4 bg-secondary rounded-full border border-secondaryBorder mr-4">
                {homeEvents.length} Resultados | Página{" "}
                {totalPages ? currentPage : "0"} / {totalPages}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        allEvents: state.allEvents,
        homeEvents: state.homeEvents,
        homeFilterByProducer: state.homeFilterByProducer,
        homeFilterByDate: state.homeFilterByDate,
        homeSort: state.homeSort,
        currentPage: state.currentPage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAllEventsOnHomeEvents: () => dispatch(setAllEventsOnHomeEvents()),
        setDateToFilter: (objectDate) => dispatch(setDateToFilter(objectDate)),
        filterEventsByDate: () => dispatch(filterEventsByDate()),
        filterEventsByProducer: (producer) =>
            dispatch(filterEventsByProducer(producer)),
        sortEvents: (sort) => dispatch(sortEvents(sort)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeNavBar);
