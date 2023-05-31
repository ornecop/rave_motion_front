import React, { useState } from 'react';
import { ImLocation2 } from "react-icons/im";
import StarRating from "./StarRating";
import Modal from 'react-modal';
import axios from "axios";
import { connect } from "react-redux";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
Modal.setAppElement('#root')

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       : '#f5f5f5',
    borderRadius          : '10px',
    width                 : '400px',
    padding               : '20px'
  }
};

export const EventCardF = ({ id, name, image, date, venue, hour,userData }) => {
  const [rating, setRating] = useState(0);
  const [modalIsOpen,setIsOpen] = useState(false);
  const [averageRating, setAverageRating] = useState(null);
  const [totalCritics, setTotalCritics] = useState(null);
  useEffect(() => {
    axios.get(`/events/rating/${id}`) 
      .then(response => {
        setAverageRating(response.data.averageRating);
        setTotalCritics(response.data.critics)
      })
      .catch(error => {
        console.error('Failed to fetch event rating:', error);
      });
  }, [eventId]);  



const handleRateClick = () => {
  // Verificar en el almacenamiento local si el usuario ya ha calificado
  const ratedEvents = JSON.parse(localStorage.getItem('ratedEvents')) || {};
  if (!ratedEvents[id]) {
    setIsOpen(true);
  } else {
    alert('Ya has calificado este evento.');
  }
};

  const updateRating = async (id, rating, userId) => {
    try {
      const response = await axios.put(`${BACKEND_URL}/events/rating`, { id, rating, userId });
      return response.data;
    } catch (err) {
      console.error(err);
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
     // Almacenar en el almacenamiento local que el usuario ha calificado este evento
     const ratedEvents = JSON.parse(localStorage.getItem('ratedEvents')) || {};
     ratedEvents[id] = true;
     localStorage.setItem('ratedEvents', JSON.stringify(ratedEvents));
    } catch (error) {
      console.error('Failed to update rating:', error);
    }
  };
  
    return (
        <div className="h-[15rem] w-[35rem] mx-auto flex flex-row bg-slate-900 rounded-xl border border-secondaryBorder">
            <div className="w-[15rem] rounded-l-xl">    
                    <div
                        className="h-full w-full rounded-l-xl bg-cover bg-bottom bg-no-repeat"
                        style={{
                            backgroundImage: `url(${image})`,
                        }}
                        loading="lazy"
                    ></div>
            </div>
            <div className="w-[20rem] flex flex-col py-4 px-4 rounded-r-xl">
                <div className="flex flex-row items-center justify-center py-2 border-b border-secondaryBorder">
                    <h2 className="text-xl align-center font-semibold">
                        {name}
                    </h2>
                </div>
                <div className="flex flex-row items-center justify-start py-2 gap-2 border-b border-secondaryBorder">
                    <ImLocation2 size="1.3rem" />
                    <span>{venue}</span>
                </div>
                <div className="flex justify-center items-center w-full">
    <h2 className="bg-red-500 text-white px-4 py-2 mt-4 rounded w-full text-center">
        FINALIZADO
    </h2>
    <p>{averageRating}</p>
    <p>{totalCritics}</p>
</div>
<div>
      <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded w-full text-center" onClick={handleRateClick}>
          Calificar
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Rate Modal"
        style={customStyles}
      >
        <StarRating rating={rating} onStarClick={onStarClick} />
        <button onClick={closeModal}>Cerrar</button>
      </Modal>
    </div>
    </div>
    </div>
  );
};
const mapStateToProps = (state) => {
    return {
        userData: state.userData
    };
};
export default connect(mapStateToProps,null) (EventCardF);