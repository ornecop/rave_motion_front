// Consts
import { FILTER_TYPES } from "../const";

export const applyFilters = (events, filterDate, filterProducer) => {
    // Aplica filtro de date y filtro de producer a un evento

    let filterEvents = [...events];

    let { startDate, endDate } = filterDate;

    // Filtro de date
    if (startDate.length) {
        startDate = new Date(startDate);
        filterEvents = filterEvents.filter((event) => {
            const eventDate = new Date(event.date);
            return (
                eventDate >= startDate &&
                (!endDate || eventDate <= new Date(endDate))
            );
        });
    }

    // Filtro de producer
    if (filterProducer != FILTER_TYPES.BY_PRODUCER.ALL) {
        filterEvents = filterEvents.filter(
            (e) => e.producer === filterProducer
        );
    }
    return filterEvents;
};
