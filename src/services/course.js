const url = 'https://intense-badlands-44228.herokuapp.com/api/course';

export const addCourse = async ({ courseName, subject, description }, accessToken) => {
    try {
        const response = await fetch(`${url}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                courseName,
                subject,
                description
            })
        })

        return await response.json();
    } catch (error) {
        throw error;
    }
}

export const getCourses = async (accessToken) => {
    try {
        const response = await fetch(`${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })

        return await response.json();
    } catch (error) {
        throw error
    }
}

export const deleteOneCourse = async (courseId, accessToken) => {
    try {
        const response = await fetch(`${url}/delete/${courseId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        return await response.json()
    } catch (error) {
        throw error
    }
}

export const registerForCourse = async (courseId, accessToken) => {
    try {
        const response = await fetch(`${url}/register/${courseId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })

        return await response.json();
    } catch (error) {
        throw error
    }
}