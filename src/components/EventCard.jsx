// React Router Dom
import { Link, useNavigate } from "react-router-dom";

// Assets
import { ImLocation2 } from "react-icons/im";
import { AiOutlineCalendar } from "react-icons/ai";

export const EventCard = ({ id, name, image, date, venue, hour }) => {
    // Format date
    const dateNew = new Date(date);
    const day = dateNew.getDate().toString().padStart(2, "0");
    const month = (dateNew.getMonth() + 1).toString().padStart(2, "0");
    const year = dateNew.getFullYear().toString();

    const formatDate = `${day}-${month}-${year}`;

    const formatHour = hour ? hour.slice(0, 5) : "-";

    // Buy click
    const navigate = useNavigate();
    const handleBuyClick = () => {
        navigate(`/event/${id}`);
    };

    return (
        <div className="h-[15rem] w-[35rem] mx-auto flex flex-row bg-slate-900 rounded-xl border border-secondaryBorder">
            <div className="w-[15rem] rounded-l-xl">
                <Link to={`/event/${id}`}>
                    <div
                        className="h-full w-full rounded-l-xl bg-cover bg-bottom bg-no-repeat"
                        style={{
                            backgroundImage: `url(${image})`,
                        }}
                        loading="lazy"
                    ></div>
                </Link>
            </div>

            <form className="flex-auto p-6 bg-white rounded-r-lg">
                <Link to={`/event/${id}`}>
                    <div className="flex flex-wrap">
                        <h1 className="flex-auto text-lg font-semibold text-slate-900">
                            {name}
                        </h1>
                        <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
                            {description}
                        </div>
                    </div>
                    <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
                        <div className="space-x-2 flex text-sm">
                            <div className="mr-6 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                📆 {formatDate}
                            </div>
                            <div className=" h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                ⌚{formatHour}
                            </div>
                        </div>
                    </div>
                </Link>

                <div className="flex space-x-4 mb-6 text-sm font-medium">
                    <div className="flex-auto flex space-x-4">
                        <Link to="/event/:eventName">
                            <button
                                className="h-10 px-6 font-semibold rounded-md bg-black text-white hover:shadow-lg shadow-black/40 "
                                type="submit"
                            >
                                Comprar
                            </button>
                        </Link>
                    </div>

                    <button
                        className="flex-none flex items-center justify-center w-9 h-9 rounded-md hover:shadow-lg shadow-indigo-500/40 text-slate-300 border border-slate-200 hover:text-red-400"
                        type="button"
                        aria-label="Like"
                    >
                        <svg
                            width="20"
                            height="20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default EventCard;
