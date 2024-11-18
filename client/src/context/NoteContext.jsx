import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { fetchNotes } from "../api/notes";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { helix } from "ldrs";


export const NoteContext = createContext()

const NoteProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState()
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate()
    const { isAuthenticated } = useContext(AuthContext)

    useEffect(() => {
        if (isAuthenticated) {
            init();
        }
        else {
            navigate('/login')
        }
    }, [isAuthenticated])


    const getNotes = async () => { // fetch all notes for a particular logged in user from the db
        try {
            const fetchedNotes = await fetchNotes();
            setNotes(fetchedNotes)
        }
        catch (err) {
            setError('Failed to fetch notes')
            navigate('/login')
        }
    }

    const init = async () => {

        await getNotes();
        setLoading(false)
    }

    const contextData = { notes, setNotes, error, setError }


    return (
        <NoteContext.Provider value={contextData}>
            {
                loading ? (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100vh'
                        }}
                    >
                        <l-helix
                            color={'rgba(206, 144, 225, 0.851)'}
                            size={100}
                            speed={2}
                        >

                        </l-helix>
                    </div>
                ) : (children)
            }
        </NoteContext.Provider>
    )

}

export default NoteProvider