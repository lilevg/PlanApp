import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserId = async () => {
    try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId !== null) {
            // return 'd094c818-0890-4801-b43b-3a8a7a4eb2a4';
            return userId;
        }
    } catch (e) {
        console.error(e)
    }
};