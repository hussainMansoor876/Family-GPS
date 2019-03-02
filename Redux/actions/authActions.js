const updateUser = (user) => {
    return {
        type: "UPDATE_USER",
        user
    }
}

const gpsChcek = (bool) => {
    return {
        type: "GPS",
        enable: bool
    }
}

const removeUser = () => {
    return {
        type: "REMOVE_USER"
    }
}

const allUser = (userList) => {
    return {
        type: "ALL_USER",
        userList
    }
}

const chatUser = (chats) =>{
    return {
        type: "CHAT_USER",
        chats
    }
}

const updateLocation = (location) =>{
    return {
        type: "LOCATION",
        location
    }
}

export {
    updateUser,
    gpsChcek,
    removeUser,
    allUser,
    chatUser,
    updateLocation
}