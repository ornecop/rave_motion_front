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
    
    <div className='text-primary flex flex-row bg-secondary '>
    <h3 className='text-white mx-2'>Select Date: </h3>
    <div>
      <label className='text-white rounded-xl'>Desde</label>
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
        <label className='text-white'>Hasta</label>
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