import React from 'react'
import { useRef } from 'react'
import { createNote } from '../api/notes'
import { NoteContext } from '../context/NoteContext'
import { useContext } from 'react'
const Color = ({style ,color }) => {

    const startingPos = useRef(10)
    const {setNotes} = useContext(NoteContext)

    const colorRef = useRef(null)

    // the showGlow and removeGlow functions are used to give a dynamic box
    // shadow to the color component
    const showGlow = () => {
        colorRef.current.style.boxShadow = `0 0 15px 5px ${style.backgroundColor}`
    }
    
    const removeGlow = () => {
        
        colorRef.current.style.boxShadow = `none`
    }

    const addNote = async () => {
        const payload = {
            position: {
                x: startingPos.current,
                y: startingPos.current
            },
            colors: color
        }

        startingPos.current+= 10
        const response = await createNote(payload)
        setNotes(prevState => [response, ...prevState])
    }

    return (
        <div 
            className='color' ref={colorRef} 
            onMouseEnter={showGlow}
            onMouseLeave={removeGlow}
            style={style}
            onClick={addNote}
        >
        </div>
    )
}

export default Color