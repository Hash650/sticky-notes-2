import { deleteNote } from "../api/notes"
import { useContext } from "react"
import { NoteContext } from "../context/NoteContext"

export const DeleteButton = ({ noteId}) => {

    const {setNotes} = useContext(NoteContext)

    const handleDelete = async (e) => {

        deleteNote(noteId)
        setNotes(prevState => prevState.filter(note => note.id !== noteId))
    }

    return (
        <div className="delete-icon" onClick={handleDelete}>
            <img src="./trash-icon.svg" alt="" />
        </div>
    )
}

