import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeUserId = async (userId) => {
    try {
        await AsyncStorage.setItem('userId', userId);
    } catch (e) {
        console.error(e)
    }
};
