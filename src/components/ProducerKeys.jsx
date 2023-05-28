// Assets
import { RiLineChartLine } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdEventAvailable } from "react-icons/md";

// Hooks
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// Axios
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Components
import Tooltip from "./Tooltip";

const ProducerKeys = ({ userId }) => {
    // Show keys indicator for producer on dashboard

    // Data del back
    const [producerData, setProducerData] = useState({});

    useEffect(() => {
        const getProducerData = async () => {
            const response = await axios.get(
                `${BACKEND_URL}/tickets/sellstickets/${userId}`
            );
            setProducerData(response.data);
        };
        console.log(producerData);

        userId && getProducerData();
    }, [userId]);

    // Indicador de ventas del producer

    // Indicador de eventos activos del producer
    const activeEvents = useSelector((state) => state.allUserEvents).filter(
        (event) => event.current === true
    );

    return (
        <section className="grid grid-cols-3 w-full place-content-between my-4 gap-16">
            <div className="p-4 rounded-xl bg-green-200 flex flex-row gap-6 items-center">
                <Tooltip tooltip="Facturación semanal total">
                    <RiLineChartLine size="4rem" className="text-green-600" />
                </Tooltip>
                <div className="w-full flex flex-col text-green-600">
                    <span className="text-4xl font-bold ">
                        ${producerData?.totalAmount?.toLocaleString("es")}
                    </span>
                    <h3 className="text-l block font-semibold">VENTAS</h3>
                </div>
            </div>

            <div className="p-4 rounded-xl bg-orange-200 flex flex-row gap-6 items-center">
                <Tooltip tooltip="Tickets vendidos última semana">
                    <HiOutlineUserGroup
                        size="4rem"
                        className="text-orange-600"
                    />
                </Tooltip>
                <div className="w-full flex flex-col text-orange-600">
                    <span className="text-4xl font-bold ">
                        {producerData?.totalSells}
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
                    <span className="text-4xl font-bold ">
                        {activeEvents.length}
                    </span>
                    <h3 className="text-l block font-semibold">
                        EVENTOS ACTIVOS
                    </h3>
                </div>
            </div>
        </section>
    );
};

export default ProducerKeys;
