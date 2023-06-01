// React Router Dom
import { Link } from "react-router-dom";

// Assets
import { ImLocation2 } from "react-icons/im";
import { AiOutlineCalendar } from "react-icons/ai";

// Components
import EventDate from "./EventDate";

export const EventCard = ({ id, name, image, date, venue, hour }) => {
    return (

        <div className="w-full h-[10rem] lg:w-full lg:h-[15rem] flex flex-row bg-slate-900 rounded-xl border border-secondaryBorder">

            <div className="w-[10rem] h-[10rem] lg:w-[15rem] lg:h-[15rem] aspect-square rounded-l-xl">
                <Link to={`/event/${id}`}>
                    <div
                        className="w-full aspect-square rounded-l-xl bg-cover bg-bottom bg-no-repeat"
                        style={{
                            backgroundImage: `url(${image})`,
                        }}
                        loading="lazy"
                    ></div>
                </Link>
            </div>

            <div className="w-full lg:w-[20rem] flex flex-col lg:py-4 px-2 lg:px-4 rounded-r-xl">
                <div className="flex flex-row items-center justify-start py-2 border-b border-secondaryBorder">
                    <h2 className="text-lg lg:text-xl align-center font-semibold">
                        {name}
                    </h2>
                </div>
                <div className="flex flex-row items-center justify-start py-2 gap-2 border-b border-secondaryBorder">
                    <span className="hidden lg:flex flex-row items-center gap-2">
                        <AiOutlineCalendar size="1.3rem" />
                        <EventDate date={date} hour={hour} />
                    </span>
                    <span className="lg:hidden flex flex-row items-center gap-2 text-sm">
                        <AiOutlineCalendar size="1rem" />
                        <EventDate date={date} hour={hour} />
                    </span>
                </div>
                <div className="flex flex-row items-center justify-start py-2 gap-2 lg:border-b lg:border-secondaryBorder">
                    <span className="hidden lg:flex flex-row items-center gap-2">
                        <ImLocation2 size="1.3rem" />

                        {venue}

                    </span>
                    <span className="lg:hidden flex flex-row items-center gap-2 text-sm">
                        <ImLocation2 size="1rem" />
                        {venue}
                    </span>
                </div>
                <div className="hidden lg:flex flex-row items-center justify-start py-2 w-full">
                    <Link
                        className="btnPrimary py-0 w-full text-center"
                        to={`/event/${id}`}
                    >
                        Comprar
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default EventCard;
