import React from "react";
import axios from "./axios";

export default class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        axios.get("/get-status/" + this.props.otherUserId).then(data => {
            if (data.data.rowCount == 0) {
                this.setState({
                    buttonText: "Send Friend Request"
                });
            } else if (data.data.rows[0].accepted == true) {
                this.setState({
                    buttonText: "Terminate Friendship"
                });
            } else if (data.data.rows[0].sender == this.props.otherUserId) {
                this.setState({
                    buttonText: "Accept Friend Request"
                });
            } else if (data.data.rows[0].accepted == false) {
                this.setState({
                    buttonText: "Delete Friend Request"
                });
            }
        });
    }
    handleClick() {
        console.log("hey hey!");
        if (this.state.buttonText == "Send Friend Request") {
            axios
                .post("/send-friend-request", { Id: this.props.otherUserId })
                .then(data => {
                    console.log(data);
                    if (data) {
                        this.setState({
                            buttonText: "Delete Friend Request"
                        });
                    }
                });
        } else if (this.state.buttonText == "Delete Friend Request") {
            axios
                .post("/delete-friend-request", { Id: this.props.otherUserId })
                .then(data => {
                    if (data) {
                        this.setState({
                            buttonText: "Send Friend Request"
                        });
                    }
                });
        } else if (this.state.buttonText == "Accept Friend Request") {
            axios
                .post("/accept-friend-request", { Id: this.props.otherUserId })
                .then(data => {
                    if (data) {
                        this.setState({
                            buttonText: "Terminate Friendship"
                        });
                    }
                });
        } else if (this.state.buttonText == "Terminate Friendship") {
            axios
                .post("/delete-friend-request", { Id: this.props.otherUserId })
                .then(data => {
                    console.log(data);
                    if (data) {
                        this.setState({
                            buttonText: "Send Friend Request"
                        });
                    }
                });
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick} className="btn btn-success">
                    {this.state.buttonText}
                </button>
            </div>
        );
    }
}
