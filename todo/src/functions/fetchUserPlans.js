import {getUsersPlans} from "./getUsersPlans";

export const fetchUserPlans = async (userId) => {
    try {
        return await getUsersPlans(userId)
    } catch (e) {
        console.error(e.message);
    }
};