import React, { useEffect, useState } from "react";
import Note from "../components/Note";
import { useContext } from "react";
import { NoteContext } from '../context/NoteContext.jsx'
import { Slide, toast, } from "react-toastify"; // Import Bounce transition
import 'react-toastify/dist/ReactToastify.css'; // Make sure styles are imported
import { getTimeBasedIcon, getGreeting } from "../utils/util.jsx";
import LogoutButton from "../components/LogoutButton.jsx";
import Controls from "../components/Controls.jsx";
import DateTimeDisplay from "../components/DateTimeDisplay.jsx";
import EventModal from "../components/EventModal.jsx";
import EventSidebar from "../components/EventSidebar.jsx";



function NotesPage() {

    const { notes, setNotes, error } = useContext(NoteContext)
    const [shownWelcomeMsg, setShownWelcomeMsg] = useState(
        localStorage.getItem('shownWelcomeMsg') === 'true'
    )

    const [events, setEvents] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)




    const handleSaveEvent = (event) => {
        const title = event.title
        const date = new Date(event.event_date)
        const formattedDate = date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        })
        setEvents([...events, 
                  { id: event.id, title: title, timeDate: formattedDate, fullDate: date, description: event.description }]
                  .sort((a, b) => new Date(a.timeDate) - new Date(b.timeDate))
                )
        setIsModalOpen(false)
    }

    useEffect(() => {
        const username = localStorage.getItem('username')
        if (username && !shownWelcomeMsg) {

            const { icon } = getTimeBasedIcon()

            toast(getGreeting() + username, {
                icon,
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "dark",
                transition: Slide,
                style: {
                    backgroundColor: 'rgb(18, 18, 18)',
                    color: 'rgba(206, 144, 225, 0.851)',
                    border: '2px solid pink'

                },
            })
            setShownWelcomeMsg(true)
            localStorage.setItem('shownWelcomeMsg', 'true')
        }

    }, [shownWelcomeMsg])




    return (
        <div>
            {error && <p>{error}</p>}
            {notes.map((note) => (<Note note={note} key={note.id} />))}
            <Controls />
            <LogoutButton />
            <DateTimeDisplay />
            <EventModal
                isOpen={isModalOpen}
                onRequestClose={() => {
                    setIsModalOpen(false)
                }}
                onSaveEvent={handleSaveEvent}
            />
            <EventSidebar events={events} openEventModal={setIsModalOpen} setEvents={setEvents} />
        </div>
    )

}

export default NotesPage;