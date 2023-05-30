// Components
import { useEffect, useState } from "react";
import Tooltip from "./Tooltip";

// Assets
import { MdDeleteOutline } from "react-icons/md";

const EventDelete = ({ tickets }) => {
    const [canDelete, setCanDelete] = useState(true);

    useEffect(() => {
        const sells = tickets?.map((t) => t.sells);
        console.log(sells);
        const ticketsSolds = sells?.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
        );
        console.log(ticketsSolds);
        if (ticketsSolds) setCanDelete(false);
    }, [tickets]);

    return (
        <Tooltip
            tooltip={!canDelete ? "El evento ya tiene ventas" : "Borrar evento"}
            x={!canDelete ? "150" : "70"}
        >
            <button
                disabled={!canDelete}
                className="disabled:cursor-not-allowed"
            >
                <MdDeleteOutline size="1.5rem" className="text-red-600" />
            </button>
        </Tooltip>
    );
};

export default EventDelete;
