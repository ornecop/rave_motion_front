import React, { useEffect } from "react";

// Modal emergente cuando se quiere realizar alguna danger action
const Modal = (props) => {
    const { modalThings, handleModalCancel, handleModalAction } = props;

    // Modal things
    const { title, description, action } = modalThings;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
            <div className="floatBox p-8 w-2/6">
                <div className="mb-4 text-2xl font-semibold">{title}</div>
                <div className="text-normal mb-6">{description}</div>
                <div className="flex flex-row gap-6 justify-end">
                    <button
                        onClick={handleModalCancel}
                        className="w-32 px-4 text-lg py-2 rounded-xl dark:bg-primary hover:bg-slate-800 focus:outline-none transition-colors duration-300"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleModalAction}
                        className="w-32 px-4 text-lg py-2 rounded-xl bg-red-600 hover:bg-red-500 focus:outline-none transition-colors duration-300"
                    >
                        {action}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
