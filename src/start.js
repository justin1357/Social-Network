import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import Welcome from "./welcome";
import { getSocket } from "./socket";
import * as io from "socket.io-client";

const socket = io.connect(store);

socket.on("welcome", function(data) {
    console.log(data);
    socket.emit("thanks", {
        message: "Thank you. It is great to be here."
    });
});

import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";
import { Provider } from "react-redux";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;

if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    elem = (getSocket(store),
    (
        <Provider store={store}>
            <App />
        </Provider>
    ));
}

ReactDOM.render(elem, document.querySelector("main"));
