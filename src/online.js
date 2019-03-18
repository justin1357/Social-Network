import React from "react";
import { connect } from "react-redux";

class Online extends React.Component {
    constructor() {
        super();
    }

    render() {
        console.log("props", this.props);
        const online = this.props.online;

        if (!online) {
            return null;
        }
        console.log("online", online);
        const onlineUsers = (
            <div>
                {online.map(user => {
                    console.log("user in map", user);
                    return (
                        <div key={user.id}>
                            <img
                                src={user.image || "/default.jpg"}
                                className="main-profile-pic"
                            />
                            <p>
                                {user.first} {user.last}
                            </p>
                        </div>
                    );
                })}
            </div>
        );
        return (
            <div className="container">
                <h3>Online</h3>
                {!online.length && <div>You have no Friends</div>}
                {!!online.length && onlineUsers}
            </div>
        );
    }
}
const mapStateToProps = state => {
    console.log("state in mp2p", state);
    return {
        online: state.user
    };
};

export default connect(mapStateToProps)(Online);
