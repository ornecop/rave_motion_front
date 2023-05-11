import React from 'react'

function EventCard({name, image, date, hour, venue }) {
    const handleAddToCart = () => {
        onAddToCart();
      };
    
      return (
        <div className="card">
          <img src={image} alt={name} />
          <h3>{name}</h3>
          <p>{event.description}</p>
          <p>Precio: ${event.price}</p>
          <button onClick={handleAddToCart}>Agregar al carrito</button>
        </div>
      );
    };


export default EventCard