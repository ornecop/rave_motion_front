// import useSelector from 'react-redux'
import EventCard from "./EventCard";

const EventContainer = ({ events }) => {
    return (
        <div className="my-6 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map((event) => (
                    <EventCard
                        key={event.id}
                        id={event.id}
                        name={event.name}
                        producer={event.producer}
                        image={event.image}
                        hour={event.hour}
                        venue={event.venue}
                        date={event.date}
                    />
                ))}
            </div>
        </div>
    );
};

export default EventContainer;
