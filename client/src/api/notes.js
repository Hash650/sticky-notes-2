import axios from 'axios'


const API_URL = import.meta.env.VITE_SERVER_URL+"/api"


// this function makes a get request to our api with the current logged in user's token
export const fetchNotes = async () => {
    try {

        const token = localStorage.getItem('token')

        if (!token) {
            throw new Error('User is not authenticated')
        }

        console.log('making request to backend')
        const response = await axios.get(`${API_URL}/notes`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })



        return response.data
    }
    catch (err) {
        console.error('Error fetching notes:', err.response.data);
        throw err.response.data
    }
}

export const updateNote = async (noteId, field, payload) => {

    try {
        const response = await axios.put(`${API_URL}/notes/${noteId}`, {
            field,
            value: payload
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        console.log('note updated successfully', response.data);
    }
    catch (err) {
        console.error('Error saving note:', err)
        throw err
    }
}

export const createNote = async (payload) => {

    try {

        const response = await axios.post(`${API_URL}/notes/create`, {payload},{
            headers:{
                "Content-Type": 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        return response.data
    }
    catch (error) {
        console.error('Error creating new note', error)
        throw error
    }

}

export const deleteNote = async (noteId) => {

    try {
        const response = await axios.delete(`${API_URL}/notes/${noteId}`)
        console.log('Note deleted successfully', response.data)
    }
    catch (err) {
        console.error('Error deleting note:', err)
        throw err
    }
}
