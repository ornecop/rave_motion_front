// Assets
import { RiLineChartLine } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdEventAvailable } from "react-icons/md";

// Components
import Tooltip from "./Tooltip";

const ProducerEventKeys = ({
    totalSeLLs,
    totalTicketsSells,
    maxTickets,
    daysToDate,
}) => {
    // Show keys indicator for event on dashboard

    return (
        <section className="grid grid-cols-3 w-full place-content-between my-4 gap-16">
            <div className="p-4 rounded-xl bg-green-200 flex flex-row gap-6 items-center">
                <Tooltip tooltip="Facturación total del evento">
                    <RiLineChartLine size="4rem" className="text-green-600" />
                </Tooltip>
                <div className="w-full flex flex-col text-green-600">
                    <span className="text-4xl font-bold ">
                        ${totalSeLLs.toLocaleString("es")}
                    </span>
                    <h3 className="text-l block font-semibold">
                        VENTAS DEL EVENTO
                    </h3>
                </div>
            </div>

            <div className="p-4 rounded-xl bg-orange-200 flex flex-row gap-6 items-center">
                <Tooltip tooltip="Tickets vendidos del evento">
                    <HiOutlineUserGroup
                        size="4rem"
                        className="text-orange-600"
                    />
                </Tooltip>
                <div className="w-full flex flex-col text-orange-600">
                    <span className="text-4xl font-bold ">
                        {totalTicketsSells} / {maxTickets}
                    </span>
                    <h3 className="text-l block font-semibold">
                        TICKETS VENDIDOS
                    </h3>
                </div>
            </div>

            <div className="p-4 rounded-xl bg-fuchsia-200 flex flex-row gap-6 items-center">
                <Tooltip tooltip="Eventos activos de la productora.">
                    <MdEventAvailable
                        size="4rem"
                        className="text-fuchsia-600"
                    />
                </Tooltip>
                <div className="w-full flex flex-col text-fuchsia-600">
                    <span className="text-4xl font-bold ">{daysToDate}</span>
                    <h3 className="text-l block font-semibold">
                        DÍAS PARA EL EVENTO
                    </h3>
                </div>
            </div>
        </section>
    );
};

export default ProducerEventKeys;
