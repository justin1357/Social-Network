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
