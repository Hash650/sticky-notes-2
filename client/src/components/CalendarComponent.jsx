import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const CalendarComponent = ({ setEventDate }) => {

  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(()=> {
    const defaultDate = new Intl.DateTimeFormat('default', {
      weekday: 'long',
      year: "numeric",
      month: 'long',
      day: 'numeric'
    }).format(selectedDate)
    setEventDate(defaultDate)
  },[])


  const onDateChange = (value, event) => {

    console.log(value)

    const date = new Intl.DateTimeFormat('default', {
      weekday: 'long',
      year: "numeric",
      month: 'long',
      day: 'numeric'
    }).format(value)
    setSelectedDate(value)
    
    setEventDate(date)
  }


  return (
    <div className='calendar-container' >
      <Calendar 
        value={selectedDate} 
        onClickDay={onDateChange} 
        minDate={new Date()}
      />
    </div>
  )
}

export default CalendarComponent