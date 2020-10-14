// import axios from 'axios';

const url = 'https://intense-badlands-44228.herokuapp.com/api/admin';

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