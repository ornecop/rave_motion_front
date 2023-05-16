// import useSelector from 'react-redux'
import EventCard from "./EventCard";

const EventContainer = ({ events }) => {
    return (
        <div className="mt-6 mx-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((event) => (
                    <EventCard
                        key={event.id}
                        id={event.id}
                        name={event.name}
                        description={event.description}
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

