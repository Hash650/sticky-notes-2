import React from 'react'
import Plus from '../icons/Plus'
import colors from '../assets/colors.json'
import { createNote } from '../api/notes'
import { useRef } from 'react'
import { useContext } from 'react'
import { NoteContext } from '../context/NoteContext'

const AddButton = () => {


    const {setNotes} = useContext(NoteContext);
    const startingPos = useRef(10)

    const addNote = async () => {

        const payload = {
            position: {
                x: startingPos.current,
                y: startingPos.current
            },
            colors: colors[0]
        }

        startingPos.current += 10

        const response = await createNote(payload)
        console.log(response)
        setNotes(prevState => [response, ...prevState])

         
    }



    return (
        <div id='add-btn' onClick={addNote}>
            <Plus />
        </div>
    )
}

export default AddButton