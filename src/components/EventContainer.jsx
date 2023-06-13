import EventCard from "./EventCard";

const EventContainer = ({ paginatedEvents }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 m-4 min-h-screen justify-items-center align-middle px-20">
            {paginatedEvents.map((event) => (
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
    );
};

export default EventContainer;
