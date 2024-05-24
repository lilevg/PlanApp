import React from "react";

const Logout = () => {
    const handleLogout = () => {
        console.log("logout!");
        // Add your logout logic here
    };
    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;