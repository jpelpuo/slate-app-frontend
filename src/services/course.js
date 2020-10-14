const url = 'https://intense-badlands-44228.herokuapp.com/api/course';

export const addCourse = async (courseName, subject, description, accessToken) => {
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