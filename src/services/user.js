import axios from 'axios';

const url = 'http://localhost:7500/api/user';

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

export const registerUser = async (firstName, lastName, gender, college, mobile, email, password) => {
    try {
        const response = await fetch(`${url}/register`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    gender,
                    college,
                    mobile,
                    email,
                    password
                })
            }
        )
        return await response.json();
    } catch (error) {
        throw error
    }
}

export const saveImage = async (imageBase64, userName) => {
    try {

        const response = await fetch(`${url}/savepicture`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    imageBase64,
                    userName
                })
            }
        )
        return await response.json();
    } catch (error) {
        throw error
    }
}

export const getUserInfo = async (email, accessToken) => {
    try {
        const response = await fetch(`${url}/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })

        return response.json();
    } catch (error) {
        throw error;
    }
}