const EventDate = ({ date, hour }) => {
    // Formateo de fecha y hour
    const formatDate = date.slice(0, 10).split("-").reverse().join("-");
    const formatHour = hour ? hour.slice(0, 5) : "-";

    return (
        <>
            {formatDate} {formatHour}
        </>
    );
};

export default EventDate;
