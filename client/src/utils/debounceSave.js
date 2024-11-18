import { useRef } from "react";

export const useDebounceSave = (saveFunction, delay) =>{

    const timerRef = useRef(null);

    const debounceSave = (noteId,field, payload) =>{
        if(timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setInterval(()=>{
            saveFunction(noteId,field, payload);
        },delay)
    }

    return debounceSave;
}