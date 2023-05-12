// import useSelector from 'react-redux'
import EventCard from '../EventCard/EventCard';

 const EventConteiner = ()=>{

    // const event = useSelector(state=>state.event);
    const event = [{
        "name":"Megajodita2",
        "image":"https://www.serargentino.com/public/images/2020/12/16093491340-Joda-773x458.jpg",
        "description":"en la pera",
        "date":"2024-09-20",
        "hour":"02:00:00",
        "venue":"Calle Falsa 456",
        "producer":"The Bow",
        "userId":"33bf78c3-51b7-41fc-a5b3-a85b7161ccc4"
    },{
        "name":"juelodita2",
        "image":"https://www.serargentino.com/public/images/2020/12/16093491340-Joda-773x458.jpg",
        "description":"en Venecolandia",
        "date":"2024-04-10",
        "hour":"03:00:00",
        "venue":"Calle Falsa 556",
        "producer":"The killers",
        "userId":"33bf56c3-55b7-413c-a5b3-a85b7161ccc4"
    },
    {
        "name":"La Muñeca",
        "image":"https://www.serargentino.com/public/images/2020/12/16093491340-Joda-773x458.jpg",
        "description":"en Colombiche",
        "date":"2025-04-10",
        "hour":"05:00:00",
        "venue":"Calle Falsa 556",
        "producer":"The Ampa",
        "userId":"33bf56c3-55b7-413c-a5b3-a85b7452ccc4"
    },
    {
        "name":"El Rumbon",
        "image":"https://www.serargentino.com/public/images/2020/12/16093491340-Joda-773x458.jpg",
        "description":"el desmadre",
        "date":"2025-04-16",
        "hour":"15:00:00",
        "venue":"Calle tu mama 556",
        "producer":"The Ampa",
        "userId":"42jf56c3-35b7-413c-a5b3-a85b7452ccc4"
    },
]

    return (
        <div className="">
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20 mt-20'>
           
            {event.map((event) => (
                <EventCard
                key={event.userId}
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
    )
}
export default EventConteiner;