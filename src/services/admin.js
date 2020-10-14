import axios from 'axios';

const url = 'http://localhost:7500/api/admin';

export const login = async (email, password) => {
    try {
        const response = await fetch(`${url}/auth`, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, password
            })
        }
       )
        return await response.json();
    } catch (error) {
        throw error
    }
}