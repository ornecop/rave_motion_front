const EventDate = ({ date, hour }) => {
    // Formateo de fecha y hour
    const dateDate = new Date(date);
    const day = dateDate.getDate().toString().padStart(2, "0");
    const month = (dateDate.getMonth() + 1).toString().padStart(2, "0");
    const year = dateDate.getFullYear().toString();

    const formatDate = `${day}-${month}-${year}`;

    const formatHour = hour ? hour.slice(0, 5) : "-";
    return (
        <>
            {formatDate} {formatHour}
        </>
    );
};

export default EventDate;
