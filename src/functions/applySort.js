// Consts
import { SORT_TYPES } from "../const";

export const applySort = (events, sort) => {
    // Aplica sort a eventos

    let sortedEvents = [...events];

    function getTimeFromString(timeString) {
        const [hours, minutes, seconds] = timeString.split(":");
        return hours * 3600 + minutes * 60 + seconds;
    }

    // Ordenamiento
    switch (sort) {
        case SORT_TYPES.BY_ALPHABETIC.ASC:
            sortedEvents.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case SORT_TYPES.BY_ALPHABETIC.DESC:
            sortedEvents.sort((a, b) => b.name.localeCompare(a.name));
            break;

        case SORT_TYPES.BY_DATE.FIRST:
            sortedEvents.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);

                if (dateA.getTime() !== dateB.getTime()) {
                    return dateA - dateB;
                }
                const timeA = getTimeFromString(a.hour);
                const timeB = getTimeFromString(b.hour);

                return timeA - timeB;
            });
            break;
        case SORT_TYPES.BY_DATE.LAST:
            sortedEvents.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);

                if (dateA.getTime() !== dateB.getTime()) {
                    return dateB - dateA;
                }
                const timeA = getTimeFromString(a.hour);
                const timeB = getTimeFromString(b.hour);
                return timeB - timeA;
            });
            break;
    }
    return sortedEvents;
};
