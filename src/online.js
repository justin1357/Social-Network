import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Online extends React.Component {
    constructor() {
        super();
    }

    render() {
        const online = this.props.online;

        if (!online) {
            return null;
        } else {
            console.log("online", online);
            const onlineUsers = (
                <div>
                    {online.map(user => {
                        return (
                            <div key={user.id} className="friends">
                                <Link to={`/user/${user.id}`}>
                                    <img
                                        src={user.image || "/default.jpg"}
                                        className="main-profile-pic"
                                    />
                                </Link>
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
}
const mapStateToProps = state => {
    return {
        online: state.user
    };
};

export default connect(mapStateToProps)(Online);
