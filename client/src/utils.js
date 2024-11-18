import { updateNote } from "./api/notes";
export const setZIndex = (selectedNote) => {
    selectedNote.style.zIndex = 999;

    //Array.from() returns an array for an iterable object
    Array.from(document.getElementsByClassName('note-card')).forEach(note => {
        if (note !== selectedNote) {
           note.style.zIndex = selectedNote.style.zIndex - 1;
        }
    })
}
