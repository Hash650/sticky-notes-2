import Modal from 'react-modal'
import { useState } from 'react'
import CalendarComponent from './CalendarComponent'
import { createEvent } from '../api/events.js'

Modal.setAppElement('#root')

const EventModal = ({ isOpen, onRequestClose, onSaveEvent }) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState('')
    const [showError, setShowError] = useState(false)
    const [eventTime, setEventTime] = useState('12:00')
    const [eventDate, setEventDate] = useState(new Intl.DateTimeFormat('default', {
        weekday: 'long',
        year: "numeric",
        month: 'long',
        day: 'numeric'
    }).format(new Date()))

    const handleSave = async () => {

        const eventDateTime = new Date(eventDate)
        const [hours, minutes] = eventTime.split(':')
        eventDateTime.setHours(hours, minutes)

        const event = {
            title: title,
            description: description,
            date: eventDateTime.toISOString()
        }

        if (validateInput()) {
            const response = await createEvent(event)
            onSaveEvent(response)
            setTitle('')
            setDescription('')
            // onRequestClose();
        }
    }

    const validateInput = () => {
        if (title === '' || title.length == 0) {
            setShowError(true)
            setError('Please enter event title')
            return false
        }
        else {
            return true
        }
    }


    const format12Hour = (time) => {

        const eventDateTime = new Date(eventDate)
        const [hours, minutes] = time.split(':')
        eventDateTime.setHours(hours, minutes)

        return new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        }).format(new Date(eventDateTime))
    }





    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'black',
            borderRadius: '10px',
            width: '60%',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,

        },
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
            zIndex: 999, // Slightly lower than modal
        }
    };


    return (
        <Modal
            isOpen={isOpen} onRequestClose={onRequestClose} contentLabel='Add Event'
            style={customStyles}

        >
            <div className='modal-heading'>
                <h2>Add Event</h2>
            </div>

            <div className='modal-content'>




                <div className="left-column">
                    <input type="text" placeholder='Event Title' value={title} onChange={(e) => {
                        setTitle(e.target.value)
                        setShowError(false)
                    }} />
                    <textarea placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

                    <p className='selected-date'>When: {eventDate} at {format12Hour(eventTime)} </p>
                    <p className='input-error' hidden={!showError}>{error}</p>
                </div>

                <div className='right-column'>
                    <CalendarComponent setEventDate={setEventDate} />

                    <input
                        id="event-time"
                        type="time"
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                    />
                </div>


            </div>

            <div className="button-group">
                <button onClick={handleSave}>Save Event</button>
                <button onClick={onRequestClose}>Cancel</button>
            </div>


        </Modal>
    );
}

export default EventModal;