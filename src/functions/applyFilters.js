// Consts
import { FILTER_TYPES } from "../const";

export const applyFilters = (events, filterDate, filterProducer) => {
    // Aplica filtro de date y filtro de producer a un evento

    let filterEvents = [...events];
    let { startDate, endDate } = filterDate;

    filterEvents = filterEvents.filter((event) => {
        // Armado de fecha completa (date + hour) y agregado de 3hs
        let eventFulDate = new Date(
            `${event.date.slice(0, 10)}T${event.hour}.000Z`
        );
        eventFulDate.setHours(eventFulDate.getHours() + 3);
        return (
            eventFulDate >= startDate &&
            (!endDate || eventFulDate <= new Date(endDate))
        );
    });

    // Filtro de producer
    if (filterProducer != FILTER_TYPES.BY_PRODUCER.ALL) {
        filterEvents = filterEvents.filter(
            (e) => e.producer === filterProducer
        );
    }

    return filterEvents;
};
