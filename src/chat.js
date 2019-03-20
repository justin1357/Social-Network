import React from "react";
import { connect } from "react-redux";
import { getSocket } from "./socket";

class Chat extends React.Component {
    handleKeyDown(e) {
        if (e.which === 13) {
            getSocket().emit("newChatMessage", e.target.value);
        }
    }
    // componentDidMount() {
    //     this.props.dispatch(getLastMessages());
    // }
    componentDidUpdate() {
        // this.chatContainer.scrollTop = "100px";
        this.chatText.value = null;
    }

    render() {
        console.log("props in chat.js", this.props);
        let messages = this.props.messages;
        if (!messages) {
            return null;
        }

        console.log("prop messages", messages);
        return (
            <div className="container">
                <h1>Chat</h1>
                <div
                    ref={elem => (this.chatContainer = elem)}
                    className="chat-container"
                >
                    {messages.map(message => {
                        console.log("message in map", message);
                        return (
                            <div key={message.message}>
                                <p>
                                    {message.first} {message.last}:{" "}
                                    {message.message}
                                </p>
                            </div>
                        );
                    })}
                </div>
                <textarea
                    onKeyDown={this.handleKeyDown}
                    ref={elem => (this.chatText = elem)}
                    className="chat-text"
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("messages mapstprops", state);
    return {
        messages: state.messages && state.messages
    };
};

export default connect(mapStateToProps)(Chat);
