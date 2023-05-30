import { useSelector, useDispatch} from "react-redux";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import EventContainer from "../../components/EventContainer"
import Paginado from "../../components/Paginado"
const images = [
  "https://wallpapercave.com/wp/wp1889483.jpg",
  "https://wallpapercave.com/wp/wp1889488.jpg",
];
import { getAllEventsFinalized } from "../../redux/actions/eventsActions";
const Reviews = () => {
  const dispatch= useDispatch()
  const Events = useSelector((state) => state.allEventsF);
  const allEvents = useSelector((state) => state.homeEventsF);
  const allEventos = useSelector((state) => state.homeEventsF);

    // Carousel
    const [currentImage, setCurrentImage] = useState(images[0]);

    // Paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage, setEventsPerPage] = useState(9);
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = allEvents.slice(indexOfFirstEvent, indexOfLastEvent);

    const totalEvents = allEvents.length;
    const totalPages = Math.ceil(totalEvents / eventsPerPage);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    useEffect(() => {
      !Events.length && dispatch(getAllEventsFinalized());
  }, []);
    return (
        <>
            <div className="w-full min-h-screen">
                {/* Carrousel */}
                <div className="h-96 overflow-hidden relative">
                    <div
                        className="h-full w-full absolute top-0 left-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 transform"
                        style={{
                            backgroundImage: `url(${currentImage})`,
                            transform: "translateX(0%)",
                        }}
                    ></div>
                    <div
                        className="h-full w-full absolute top-0 left-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 transform"
                        style={{
                            backgroundImage: `url(${
                                currentImage === images[0]
                                    ? images[1]
                                    : images[0]
                            })`,
                            transform: "translateX(100%)",
                        }}
                    ></div>
                </div>
                <div className="flex w-fit justify-self-end my-2 items-center gap-6 py-1 px-4 bg-secondary rounded-full border border-secondaryBorder mr-4">
                    <>{allEvents.length} Resultados</> | Página{" "}
                    {totalPages ? currentPage : "0"} / {totalPages}
                </div>
            </div>

            <div className="min-h-[50vh] flex items-center justify-center">
                {isLoading ? (
                    <Loading />
                ) : currentEvents.length === 0 ? (
                    <div className="flex flex-col w-full h-full items-center justify-center">
                        <h2 className="font-bold text-center text-5xl">
                            LO SENTIMOS
                        </h2>
                        <h3 className="text-white text-xl text-center">
                            No se han encontrado resultados
                        </h3>
                    </div>
                ) : (
                    <div>
                        <EventContainer events={currentEvents} />
                        {isLoading ? null : (
                            <Paginado
                                eventsPerPage={eventsPerPage}
                                allEventos={allEventos.length}
                                paginado={paginado}
                                currentPage={currentPage}
                            />
                        )}
                    </div>
                )}
            </div>
        </>
    );
};
export default Reviews;
