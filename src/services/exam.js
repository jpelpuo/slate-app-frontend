
const url = 'https://intense-badlands-44228.herokuapp.com/api/exam'

export const addNewExam = async ({ name, duration, questions }, accessToken) => {
    try {
        const response = await fetch(`${url}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                name, duration, questions
            })
        })

        return await response.json();
    } catch (error) {
        throw error
    }
}