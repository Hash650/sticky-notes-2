import React, { useCallback } from "react";
import { useRef, useEffect, useState } from "react";
import { DeleteButton } from "../icons/DeleteButton.jsx";
import { updateNote } from "../api/notes.js";
import { setZIndex } from "../utils";
import NoteLock from "../icons/NoteLock.jsx";
import { helix } from "ldrs";

helix.register()


function Note(props) {
    const noteTitle = props.note.title
    const body = props.note.content
    const style = props.note.colors
    // let position = JSON.parse(props.note.position)

    const textAreaRef = useRef(null)
    const titleAreaRef = useRef(null)
    const noteRef = useRef(null)
    const [position, setPosition] = useState(props.note.position);
    const isMovedRef = useRef(false)


    //hook for text box auto save
    const [saving, setSaving] = useState(false);

    const keyUpTimer = useRef(null)


    //hook for locking note in place
    const [isLocked, setIsLocked] = useState(false)

    useEffect(() => {
        resize(textAreaRef)
        setZIndex(noteRef.current)
    }, [])


    const changeTitle = (e) => {

        const numChar = e.target.value.length
        if (numChar > 26) {
            e.target.value = e.target.value.slice(0, 27)
        }

    }

    //auto save function 

    const handleKeyUp = async (e) => {
        setSaving(true);

        if (keyUpTimer.current) {
            clearTimeout(keyUpTimer.current);
        }
        let field
        let payload

        if (e.target.id === 'note-input') {
            field = 'content'
            payload = textAreaRef.current.value
        }
        else if (e.target.id === 'note-title') {
            field = 'title'
            payload = titleAreaRef.current.value
        }


        keyUpTimer.current = setTimeout(async () => {
            try {
                await updateNote(props.note.id, field, payload)

                setSaving(false)
            }
            catch (err) {
                console.error("Error saving note:", err)
            }
        }, 2000)
    }


    // make function for the dynamic resizing of our note card
    function resize(textAreaRef) {
        const current = textAreaRef.current;

        if (current) {
            current.style.height = 'auto';
            current.style.height = current.scrollHeight + 'px';
        }
    }

    // functions to make Note draggable
    let mouseStartPos = { x: 0, y: 0 }

    const mouseDown = (e) => {

        if (e.target.className === 'note-titlebar' && !isLocked) {


            setZIndex(noteRef.current) // bring the note user has clicked on to the front  
            mouseStartPos.x = e.clientX;
            mouseStartPos.y = e.clientY;
            isMovedRef.current = false

            document.addEventListener('mousemove', mouseMove);
            document.addEventListener('mouseup', mouseUp)
        }
    }

    // this method ensures that the new position being assigned to the Note Component does not go 
    // out of bounds from the top and left of the view port
    const getNewPosition = (noteRef, dir = { x: 0, y: 0 }) => {

        const left = noteRef.current.offsetLeft - dir.x;
        const top = noteRef.current.offsetTop - dir.y;

        return {
            x: left < 0 ? 0 : left,
            y: top < 0 ? 0 : top
        }
    }

    const mouseMove = (e) => {

        isMovedRef.current = true

        let dir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY
        }

        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;

        // off set the position of the card by the direction the mouse was moved

        const newPosition = getNewPosition(noteRef, dir);
        setPosition(newPosition);
    }

    const mouseUp = () => {
        document.removeEventListener('mousemove', mouseMove)
        document.removeEventListener('mouseup', mouseUp)

        // console.log(isMoved)
        if (isMovedRef.current) // only update the note's position if it has actually been dragged
        {
            const newPosition = getNewPosition(noteRef)
            try {

                updateNote(props.note.id, 'position', newPosition)
            } catch (error) {

                console.log(error.message)
            }
        }
    }





    return (
        <div className="note-card"


            ref={noteRef}
            style={{
                backgroundColor: style.colorBody,
                top: `${position.y}px`,
                left: `${position.x}px`
            }}
        >
            <div
                className="note-titlebar"
                style={{ backgroundColor: style.colorHeader }}
                onMouseDown={mouseDown}
            >
                <div className="title-box">
                    {/* {title} */}
                    <textarea
                        name=""
                        id="note-title"
                        ref={titleAreaRef}
                        defaultValue={noteTitle}
                        onKeyDown={changeTitle}
                        onKeyUp={handleKeyUp}
                    >
                    </textarea>
                </div>

                <div className="saveicon-deletebutton">

                    {saving &&
                        <l-helix
                            size={27}
                            speed={2}
                            color={'black'}
                        ></l-helix>
                    }
                    <DeleteButton noteId={props.note.id} />
                </div>
            </div>
            <div className="note-content">
                <textarea
                    onKeyUp={handleKeyUp}
                    ref={textAreaRef}
                    onInput={() => { resize(textAreaRef) }}
                    onFocus={() => { setZIndex(noteRef.current) }}
                    name="" id="note-input"
                    defaultValue={body}
                    style={{ color: style.colorText }}
                >
                </textarea>
                
            </div>
            <NoteLock bgcolor={style.colorHeader} lockNote={setIsLocked}/>
        </div>
    )
};

export default Note;