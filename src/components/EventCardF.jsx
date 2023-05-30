// React Router Dom
import { Link, useNavigate } from "react-router-dom";

// Assets
import { ImLocation2 } from "react-icons/im";
import { AiOutlineCalendar } from "react-icons/ai";

// Components
import EventDate from "./EventDate";

export const EventCardF = ({ id, name, image, date, venue, hour }) => {
    // Buy click
    const navigate = useNavigate();
    const handleBuyClick = () => {
        navigate(`/event/${id}`);
    };

    return (
        <div className="h-[15rem] w-[35rem] mx-auto flex flex-row bg-slate-900 rounded-xl border border-secondaryBorder">
            <div className="w-[15rem] rounded-l-xl">
                <Link to={`/eventfinalized/${id}`}>
                    <div
                        className="h-full w-full rounded-l-xl bg-cover bg-bottom bg-no-repeat"
                        style={{
                            backgroundImage: `url(${image})`,
                        }}
                        loading="lazy"
                    ></div>
                </Link>
            </div>

            <div className="w-[20rem] flex flex-col py-4 px-4 rounded-r-xl">
                <div className="flex flex-row items-center justify-center py-2 border-b border-secondaryBorder">
                    <h2 className="text-xl align-center font-semibold">
                        {name}
                    </h2>
                </div>
                <div className="flex flex-row items-center justify-start py-2 gap-2 border-b border-secondaryBorder">
                    <AiOutlineCalendar size="1.3rem" />
                    <span className="">
                        <EventDate date={date} hour={hour} />
                    </span>
                </div>
                <div className="flex flex-row items-center justify-start py-2 gap-2 border-b border-secondaryBorder">
                    <ImLocation2 size="1.3rem" />
                    <span>{venue}</span>
                </div>
                <div className="flex justify-center items-center w-full">
    <h2 className="bg-red-500 text-white px-4 py-2 mt-4 rounded w-full text-center">
        FINALIZADO
    </h2>
</div>


            </div>
        </div>
    );
};
export default EventCardF;