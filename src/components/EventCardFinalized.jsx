import React, { useState, useEffect } from "react";
import { ImLocation2 } from "react-icons/im";
import StarRating from "./StarRating";
import Modal from "react-modal";
import axios from "axios";
import StarRatingStatic from "./StarRatingStatic";
import { connect } from "react-redux";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
Modal.setAppElement("#root");

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#1F2937",
        borderRadius: "10px",
        width: "33.33%",
        padding: "20px",
        color: "#F5F5F5",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        zIndex: "50",
        position: "fixed",
    },
};

export const EventCardF = ({
    id,
    name,
    image,
    date,
    venue,
    hour,
    userData,
}) => {
    const [rating, setRating] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [averageRating, setAverageRating] = useState(null);
    const [totalCritics, setTotalCritics] = useState(null);

    const [disable, setDisable] = useState(true);
    let cont = 0;
    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/userTickets/ticketsByUser/${userData.id}`)
            .then((response) => {
                response.data.map((ticket) => {
                    if (ticket.eventId === id) {
                        cont++;
                    }
                });
                if (cont !== 0) {
                    setDisable(false);
                }
            });
    }, [userData.id]);

    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/events/rating/${id}`)
            .then((response) => {
                setAverageRating(response.data.averageRating);
                setTotalCritics(response.data.critics);
            })
            .catch((error) => {
                console.error("Failed to fetch event rating:", error);
            });
    }, [id]);

    const handleRateClick = () => {
        // Verificar en el almacenamiento local si el usuario ya ha calificado
        const ratedEvents =
            JSON.parse(localStorage.getItem("ratedEvents")) || {};
        if (!ratedEvents[id]) {
            setIsOpen(true);
        } else {
            alert("Ya has calificado este evento.");
        }
    };

    const updateRating = async (id, rating, userId) => {
        try {
            const response = await axios.put(`${BACKEND_URL}/events/rating`, {
                id,
                rating,
                userId,
            });
            return response.data;
        } catch (err) {
            console.error(err);
            return err;
        }
    };
    const onStarClick = (nextValue, prevValue, name) => {
        setRating(nextValue);
    };
    const closeModal = async () => {
        setIsOpen(false);
        const userId = userData.id;
        try {
            const ratingP = await updateRating(id, rating, userId);
            const ratedEvents =
                JSON.parse(localStorage.getItem("ratedEvents")) || {};
            ratedEvents[id] = true;
            localStorage.setItem("ratedEvents", JSON.stringify(ratedEvents));
            // Almacenar en el almacenamiento local que el usuario ha calificado este evento
        } catch (error) {
            console.error("Failed to update rating:", error);
        }
    };
    return (
        <div className="min-h-[20rem] md:h-[15rem] w-full md:w-[35rem] mx-auto flex flex-col md:flex-row bg-slate-900 rounded-xl border border-secondaryBorder">
            <div className="w-full md:w-[15rem] rounded-t-xl md:rounded-l-xl md:rounded-tr-none">
                <div
                    className="h-[10rem] md:h-full w-full rounded-t-xl md:rounded-l-xl bg-cover bg-bottom bg-no-repeat"
                    style={{
                        backgroundImage: `url(${image})`,
                    }}
                    loading="lazy"
                ></div>
            </div>
            <div className="w-full md:w-[20rem] flex flex-col justify-between py-4 px-4 rounded-b-xl md:rounded-r-xl space-y-4">
                <div className="flex flex-row items-center justify-center py-0 border-b border-secondaryBorder">
                    <h2 className="text-xl align-center font-semibold">
                        {name}
                    </h2>
                </div>
                <div className="flex flex-row items-center justify-start py-2 gap-2 ">
                    <ImLocation2 size="1.3rem" />
                    <span>{venue}</span>
                </div>
                <div className="flex justify-center items-center w-full">
                    <h2 className="w-full text-center py-2 rounded-xl bg-red-600 hover:bg-red-500 focus:outline-none transition-colors duration-300">
                        FINALIZADO
                    </h2>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <StarRatingStatic rating={averageRating} /> (
                        {totalCritics})
                    </div>
                    <button
                        className="bg-blue-600 text-white px-10 py-3 mt-4 rounded text-sm"
                        style={{ cursor: disable ? "not-allowed" : "auto" }}
                        onClick={handleRateClick}
                        disabled={disable}
                    >
                        Calificar
                    </button>
                </div>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Rate Modal"
                    style={customStyles}
                >
                    <div className="text-center text-xl font-semibold mb-4">
                        Por favor, selecciona la cantidad de estrellas para
                        calificar.
                    </div>
                    <StarRating rating={rating} onStarClick={onStarClick} />
                    <div className="text-center text-md mt-4">
                        Tu valoración nos ayuda a mejorar nuestro servicio.
                        ¡Gracias por tu tiempo!
                    </div>
                    <button
                        onClick={closeModal}
                        className="mt-4 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none transition-colors duration-300"
                    >
                        Cerrar
                    </button>
                </Modal>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        userData: state.userData,
    };
};
export default connect(mapStateToProps, null)(EventCardF);
