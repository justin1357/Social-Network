import React from "react";
import { connect } from "react-redux";
import { getSocket } from "./socket";

class Chat extends React.Component {
    handleKeyDown(e) {
        if (e.which === 13) {
            getSocket().emit("newChatMessage", e.target.value);
        }
    }
    componentDidMount() {}
    componentDidUpdate() {
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
        this.chatText.value = null;
    }

    render() {
        let messages = this.props.messages;
        if (!messages) {
            return null;
        }

        console.log("prop messages", messages);
        return (
            <div className="container chat-div">
                <h1>Chat</h1>
                <div
                    ref={elem => (this.chatContainer = elem)}
                    className="chat-container"
                >
                    {messages.map(message => {
                        return (
                            <div key={message.id}>
                                <p>
                                    {message.first} {message.last}:{" "}
                                    {message.message}
                                </p>
                            </div>
                        );
                    })}
                    <textarea
                        onKeyDown={this.handleKeyDown}
                        ref={elem => (this.chatText = elem)}
                        className="chat-text"
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        messages: state.messages && state.messages
    };
};

export default connect(mapStateToProps)(Chat);
