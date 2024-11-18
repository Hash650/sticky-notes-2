import React, { useRef } from 'react'
import { useState, useEffect } from 'react'
const DateTimeDisplay = () => {

  const [currentTime, setCurrentTime] = useState({
    time: '',
    date: '',
    day: ''
  })

  const [expand, setExpand] = useState(false)
  const clockRef = useRef()

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const dayAndDate = formatDate(now)

      setCurrentTime({
        time: timeString,
        dayAndDate: dayAndDate
      })
    }

    const formatDate = (date) => {
      return new Intl.DateTimeFormat("default", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date)
    }

    updateTime();

    const now = new Date()
    const millisecUntilNextMin = (60 - now.getSeconds()) * 1000;

    const initialTimeout  = setTimeout(() => {
      updateTime()
      
      const intervalId = setInterval(updateTime, 6000);

      return ()=> clearInterval(intervalId)

    }, millisecUntilNextMin)




    return () => clearTimeout(initialTimeout)
  }, [])




  useEffect(() => {
    const handleClickOutside = (event) => {
      if (clockRef.current && !clockRef.current.contains(event.target)) {
        setExpand(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [clockRef]);

  const expandTime = () => {
    setExpand(true);
  }


  return (
    <div className="datetime-display" onClick={expandTime} ref={clockRef}>
      <div className="time">{currentTime.time}</div>
      <div className="day-date"
        style={{
          height: expand ? '80px' : '0',
          opacity: expand ? 1 : 0,
          overflow: 'hidden',
          transition: 'height 0.3s ease-in-out, opacity 0.3s ease-in-out'
        }}
      >{currentTime.dayAndDate}</div>

    </div>
  )
}

export default DateTimeDisplay