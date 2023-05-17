import React, { useState } from 'react';

/* =======================================================
    VIEW ProducerDashboard - "/dashboard" - Vista para producers

    styles:
    listado de events con acciones (edit, remove, detail)

    * editar lleva a /create con los campos actuales en props
    * remove hace borrado logico con el backend
    * detail lleva a "/dashboard/:eventName"
    
*/

const ProducerDashboard = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEventsToDelete, setSelectedEventsToDelete] = useState([]);

  const events = [
    { id: 1, name: 'Evento 1', details: 'Detalles del evento 1' },
    { id: 2, name: 'Evento 2', details: 'Detalles del evento 2' },
    { id: 3, name: 'Evento 3', details: 'Detalles del evento 3' },
  ];

  const handleEventSelection = (event) => {
    setSelectedEvent(event);
  };

  const handleEventDeletion = () => {
    // Lógica para eliminar los eventos seleccionados
    console.log('Eventos seleccionados para eliminar:', selectedEventsToDelete);
  };

  return (
    <div className="flex">
      <div className="w-1/4 bg-gray-200">
        <h1 className="text-lg font-bold p-4">Eventos</h1>
        <select
          className="p-4 bg-white border border-gray-300 rounded w-full"
          value={selectedEvent ? selectedEvent.id : ''}
          onChange={(e) => {
            const eventId = parseInt(e.target.value);
            const selected = events.find((event) => event.id === eventId);
            handleEventSelection(selected);
          }}
        >
          <option value="">Seleccione un evento</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-1/4 bg-gray-300">
        <h1 className="text-lg font-bold p-4">Eliminar eventos</h1>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleEventDeletion}
          disabled={selectedEventsToDelete.length === 0}
        >
          Eliminar eventos seleccionados
        </button>
        <ul>
          {events.map((event) => (
            <li
              key={event.id}
              className={`p-4 cursor-pointer ${
                selectedEventsToDelete.includes(event) ? 'bg-red-500 text-white' : ''
              }`}
              onClick={() => {
                if (selectedEventsToDelete.includes(event)) {
                  setSelectedEventsToDelete((prevSelectedEvents) =>
                    prevSelectedEvents.filter((selectedEvent) => selectedEvent !== event)
                  );
                } else {
                  setSelectedEventsToDelete((prevSelectedEvents) => [...prevSelectedEvents, event]);
                }
              }}
            >
              {event.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-1/2 bg-gray-400 p-4">
        <h1 className="text-lg font-bold mb-4">Detalles del evento</h1>
        {selectedEvent ? (
          <div>
            <h2 className="text-xl font-bold">{selectedEvent.name}</h2>
            <p>{selectedEvent.details}</p>
          </div>
        ) : (
          <p>Selecciona un evento para ver sus detalles</p>
        )}
      </div>
    </div>
  );
};

export default ProducerDashboard;
