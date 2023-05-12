import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CalendarFilter({setEndDate, setStartDate, endDate, startDate}) {

const handleStartDateChange = (date) => {
    setStartDate(date);
};

const handleEndDateChange = (date) => {
    setEndDate(date);
};

  return (
    <div className='text-black'>
      <h3>Seleccione un rango de fechas:</h3>
      <div>
        <label>Desde:</label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <div>
        <label>Hasta:</label>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="dd/MM/yyyy"
        />
      </div>
    </div>
  );
}

export default CalendarFilter;