export const getUserInfo = async (userId) => {
    if (!userId) return;

    try {
        const response = await fetch(`http://192.168.1.100:8000/user/${userId}`, {
            method: 'GET',
        });
        return await response.json();
        // return {
        //     id: "d094c818-0890-4801-b43b-3a8a7a4eb2a4",
        //     name: "ttttt",
        //     surname: "lyzo",
        //     email: "lizohub@com",
        //     password: "$2a$10$unfh5QPOhDyIMiTcJzDcVO6mbJlKd.yXrGeq98VMZmjCn6p/bV.UC",
        //     salt: "$2a$10$unfh5QPOhDyIMiTcJzDcVO",
        //     hashedRefreshToken: "$2a$10$bNlJyTV8AWICAQWKAt1g4OVvbKzLAxtcQWF1w4slPS5oAE3g3gtY."
        // }
    } catch (e) {
        console.log(e)
    }
};