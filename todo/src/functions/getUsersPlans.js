export const getUsersPlans = async (userId) => {
    if (!userId) return;

    try {
        const response = await fetch(`http://192.168.1.100:8001/plan/${userId}`, {
            method: 'GET',
        });
        return await response.json();
    } catch (e) {
        console.log(e)
    }
};