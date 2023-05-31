import { useState } from "react";
import { FaStar } from "react-icons/fa";

const Star = ({ selected = false, onSelect = f => f }) => (
  <FaStar 
    className={`cursor-pointer h-8 w-8 mr-1 transition-colors duration-200 ${selected ? 'text-yellow-500' : 'text-gray-400'}`}
    onClick={onSelect}  
  />
);
const createArray = (length) => [...Array(length)];

const StarRating = ({ totalStars = 5, onStarClick }) => {
  const [selectedStars, setSelectedStars] = useState(0);

  const handleStarClick = (index) => {
    setSelectedStars(index + 1);
    onStarClick(index + 1);  // Pass the new rating up to the parent component
  };
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex">
        {createArray(totalStars).map((n, i) => (
          <Star
            key={i}
            selected={selectedStars > i}
            onSelect={() => handleStarClick(i)}
          />
        ))}
      </div>
      <p className="text-sm text-gray-800 mt-2">
        {selectedStars} de {totalStars} estrellas
      </p>
    </div>
  );
};


export default StarRating;


