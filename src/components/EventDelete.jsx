// Components
import { useEffect, useState } from "react";
import Tooltip from "./Tooltip";

// Assets
import { MdDeleteOutline } from "react-icons/md";

const EventDelete = ({ tickets, eventId, eventName }) => {
    // Can Delete
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

    // Delete proccess
    const [deleteWasClicked, setDeleteWasClicked] = useState(false);
    const [deleteWasConfirmed, setDeleteWasConfirmed] = useState(false);

    // 1
    const handleDeleteClick = () => {
        setDeleteWasClicked(true);
    };

    const handleModalCancel = () => {
        setDeleteWasClicked(false);
        setDeleteWasConfirmed(false);
    };

    const handleEventDelete = () => {
        setDeleteWasConfirmed(true);
    };
    // 2
    const deleteEvent = () => {};

    return (
        <>
            {deleteWasClicked && !deleteWasConfirmed ? (
                <>
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
                        <div className="floatBox p-8 w-2/6">
                            <div className="mb-4 text-2xl font-semibold">
                                Eliminar evento
                            </div>
                            <div className="text-normal mb-6">
                                Estas seguro que queres eliminar el evento
                                seleccionado? Esta acción es permanente.
                            </div>
                            <div className="flex flex-row gap-6 justify-end">
                                <div className="flex flex-row gap-6 justify-end">
                                    <button
                                        onClick={handleModalCancel}
                                        className="w-32 px-4 text-lg py-2 rounded-xl bg-primary hover:bg-slate-800 focus:outline-none transition-colors duration-300"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleEventDelete}
                                        className="w-32 px-4 text-lg py-2 rounded-xl bg-red-600 hover:bg-red-500 focus:outline-none transition-colors duration-300"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : deleteWasConfirmed && !deleteWasClicked ? (
                <>
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
                        <div className="floatBox p-8 w-2/6">
                            <div className="mb-4 text-2xl font-semibold">
                                Eliminar evento
                            </div>
                            <div className="text-normal mb-6">
                                Para confirmar tipea "{eventName}" en la caja de
                                abajo
                            </div>
                            <div className="flex flex-row gap-6 justify-end">
                                <div className="flex flex-row gap-6 justify-end">
                                    <button
                                        onClick={handleModalCancel}
                                        className="w-32 px-4 text-lg py-2 rounded-xl bg-primary hover:bg-slate-800 focus:outline-none transition-colors duration-300"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={deleteEvent}
                                        className="w-32 px-4 text-lg py-2 rounded-xl bg-red-600 hover:bg-red-500 focus:outline-none transition-colors duration-300"
                                    >
                                        Confirmar y eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <Tooltip
                    tooltip={
                        !canDelete
                            ? "El evento ya tiene ventas"
                            : "Borrar evento"
                    }
                    x={!canDelete ? "150" : "70"}
                >
                    <button
                        disabled={!canDelete}
                        className="disabled:cursor-not-allowed"
                        onClick={handleDeleteClick}
                    >
                        <MdDeleteOutline
                            size="1.5rem"
                            className="text-red-600"
                        />
                    </button>
                </Tooltip>
            )}
        </>
    );
};

export default EventDelete;
