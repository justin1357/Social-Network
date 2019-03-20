import React from "react";
import { connect } from "react-redux";
import { getFriends, terminateFriend, acceptFriend } from "./actions";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class Friends extends React.Component {
    constructor() {
        super();
        // this.state = {};
    }
    componentDidMount() {
        //Dispatch
        this.props.dispatch(getFriends());
    }
    render() {
        // console.log("friends render", this.props);
        const { friends, pending } = this.props;
        if (!friends) {
            return null;
        } else if (!pending) {
            return null;
        }
        const currentFriends = (
            <div>
                {friends.map(friend => {
                    console.log(friend);
                    if (friend.accepted == null) {
                        return;
                    }
                    return (
                        <div key={friend.id} className="friends">
                            <Link to={`/user/${friend.id}`}>
                                <img
                                    src={friend.image || "/default.jpg"}
                                    className="main-profile-pic"
                                />
                            </Link>
                            <p>
                                {friend.first} {friend.last}
                            </p>
                            <Button
                                variant="success"
                                onClick={() => {
                                    this.props.dispatch(
                                        terminateFriend(friend.id)
                                    );
                                }}
                            >
                                Terminate Friend
                            </Button>
                        </div>
                    );
                })}
            </div>
        );
        const pendingFriends = (
            <div>
                {pending.map(pender => {
                    return (
                        <div key={pender.id} className="friends">
                            <Link to={`/user/${pender.id}`}>
                                <img
                                    src={pender.image || "/default.jpg"}
                                    className="main-profile-pic"
                                />
                            </Link>
                            <p>
                                {pender.first} {pender.last}
                            </p>
                            <Button
                                variant="success"
                                onClick={() => {
                                    this.props.dispatch(
                                        acceptFriend(pender.id)
                                    );
                                }}
                            >
                                Accept Friend Request
                            </Button>
                        </div>
                    );
                })}
            </div>
        );
        return (
            <div className="container">
                <h3>Current Friends</h3>
                {!friends.length && <div>You have no Friends</div>}
                {!!friends.length && currentFriends}
                <h3>Pending Friends</h3>
                {!pending.length && <div>You have no Friend Requests</div>}
                {!!pending.length && pendingFriends}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        pending:
            state.friends &&
            state.friends.filter(user => user.accepted == false),
        friends:
            state.friends && state.friends.filter(user => user.accepted == true)
    };
};

export default connect(mapStateToProps)(Friends);
