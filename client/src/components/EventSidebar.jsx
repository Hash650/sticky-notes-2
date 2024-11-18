import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { deleteEvent, fetchEvents } from '../api/events'

const EventSidebar = ({ events, openEventModal, setEvents }) => {

    const [selectedEvent, setSelectedEvent] = useState(null)
    const [descriptionPosY, setDescriptionPosY] = useState()




    const sidebarRef = useRef(null)


    useEffect(() => {
        const getEvents = async () => {
            const evs = await fetchEvents()

            const formatEvents = evs.map(e => {
                const date = new Date(e.event_date)


                const formatDate = date.toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                })
                
                

                return {
                    id: e.id,
                    title: e.title,
                    fullDate: date, 
                    timeDate: formatDate,
                    description: e.description
                }
            }
            )
            
            setEvents(formatEvents)
        }

        getEvents()


        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setSelectedEvent(null); // Deselect event
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside); // Cleanup event listener
        };
    }, [])


    const checkDateTodayTomorrow = (date) => {

        const now = new Date(); // Current date and time
        const event = date
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Start of today
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        
        if (event >= today && event < tomorrow) {
            return "Today, "+ date.toLocaleString('en-us', {
                hour:'numeric',
                minute: 'numeric',
                hour12: true
            });
        } else if (event >= tomorrow && event < new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate() + 1)) {
            return "Tomorrow, "+ date.toLocaleString('en-us', {
                hour:'numeric',
                minute: 'numeric',
                hour12: true
            });
        } else {
            // Default format for other dates
            return date.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            })
        }
    }

    const handleEventSelect = (event, e) => {
        
        setDescriptionPosY(e.target.getBoundingClientRect().top - sidebarRef.current.getBoundingClientRect().top - 20)
        setSelectedEvent(event)
    }

    const handleEventDelete = async () => {

        console.log(selectedEvent)        

        const eventMod = events.filter((e) => {
            return e.id != selectedEvent.id
        })


        setEvents(eventMod)
        try {
            await deleteEvent(selectedEvent.id)
        }
        catch (err) {
            console.error(err.message)
        }

    }

    return (
        <div className="events-sidebar" ref={sidebarRef}>
            <h3>Upcoming Events</h3>

            <div className='events'>

                {events.map(event => {

                    let selectedEventId

                    if(selectedEvent)
                    {
                        selectedEventId = selectedEvent.id
                    }

                    return (<div key={event.id} className={`event-item ${selectedEventId === event.id ? 'selected' : ''}`} onClick={(e) => {

                        handleEventSelect(event, e)
                    }}>
                        <span className='date'>{checkDateTodayTomorrow(event.fullDate)}</span>
                        <span className='title'>{event.title}</span>
                        {selectedEvent && <button hidden={event.id != selectedEvent.id} className='delete-ev-btn' onClick={() => {
                            setSelectedEvent(null)
                            handleEventDelete()
                        }}><img src="./trash-icon.svg" alt="" width={'20px'} /></button>}

                    </div>)
                })}

            </div>



            <div className="add-event-btn" onClick={() => {
                openEventModal(true)
            }}>+ Add Event</div>

            {selectedEvent && events.some((e) => e.id === selectedEvent.id) && (
                <div key={selectedEvent.id} className="event-description-dialog" style={{ top: descriptionPosY }}>
                    <div className="dialog-arrow"></div>
                    <h3 style={{ textAlign: 'left' }}>Event Details:</h3>
                    <p>{selectedEvent.description}</p>
                </div>
            )}


        </div>
    )
}

export default EventSidebar
