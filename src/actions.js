// all axios requests
// all functions in this file must return an object
import axios from "./axios";

export async function terminateFriend(id) {
    const { data } = await axios.post("/delete-friend-request", { Id: id });
    return {
        type: "DELETE_FRIEND",
        friends: data
    };
}

export async function acceptFriend(id) {
    const { data } = await axios.post("/accept-friend-request", { Id: id });
    return {
        type: "ACCEPT_FRIEND",
        friends: data
    };
}

export async function getFriends() {
    const { data } = await axios.get("/get-all-friends");
    return {
        type: "GET_FRIENDS",
        friends: data.rows
    };
}

export async function otherProfile(id) {
    const { data } = await axios.get(`/api-user/${id}`);
    return {
        type: "GET_OTHERPROFILE",
        user: data.rows[0]
    };
}

export async function onlineUsers(data) {
    return {
        type: "ONLINE_USERS",
        onlineUsers: data.onlineUsers.rows
    };
}

export async function userJoined(data) {
    console.log("user joined in actions", data);
    return {
        type: "USER_JOINED",
        onlineUsers: data
    };
}

export async function userLeft(data) {
    return {
        type: "USER_LEFT",
        userLeft: data.userLeft
    };
}

export async function getLastMessages(data) {
    return {
        type: "LAST_MESSAGES",
        messages: data
    };
}
