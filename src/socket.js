import * as io from "socket.io-client";
import {
    onlineUsers,
    userJoined,
    userLeft,
    getLastMessages,
    addnewMessage
} from "./actions";
let socket;

export function getSocket(store) {
    if (!socket) {
        socket = io.connect();

        socket.on("onlineUsers", data => {
            store.dispatch(onlineUsers(data));
        });

        socket.on("userJoined", data => {
            store.dispatch(userJoined(data));
        });

        socket.on("userLeft", data => {
            store.dispatch(userLeft(data));
        });
        socket.on("messages", data => {
            store.dispatch(getLastMessages(data));
        });
        socket.on("newMessage", data => {
            console.log("data message in socket.js", data);
            store.dispatch(addnewMessage(data));
        });
    }
    return socket;
}
