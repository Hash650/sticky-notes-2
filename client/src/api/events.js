import axios from 'axios'

const API_URL = import.meta.env.SERVER_URL+"/api"



export const deleteEvent = async (eventId) => {
    try {
        const response = await axios.delete(`${API_URL}/events/delete/${eventId}`)
        console.log('Event deleted')
        
    }
    catch(error) {
        console.error('Error deleting note', error)
        throw err
    }
}


export const createEvent = async (event) => {

    try{
        const response = await axios.post(`${API_URL}/events/create`, {event}, {

            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        return response.data
    }
    catch(error)
    {
        console.error('Error creating new event', error.message)
        throw error
    }
}

export const fetchEvents = async () => {
    try{
        const token = localStorage.getItem('token')

        if(!token)
        {
            throw new Error('User is not authenticated')
        }

        console.log('fetching user events ...')

        const response = await axios.get(`${API_URL}/events`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data
    }
    catch(error)
    {
        console.error('Error fetching events', error);
        throw error.response.data
    }
}
