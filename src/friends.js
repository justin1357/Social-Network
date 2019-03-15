import React from "react";
import { connect } from "react-redux";
import { getFriends, terminateFriend, acceptFriend } from "./actions";

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
                            <img
                                src={friend.image || "/default.jpg"}
                                className="main-profile-pic"
                            />
                            <p>
                                {friend.first} {friend.last}
                            </p>
                            <button
                                onClick={() => {
                                    this.props.dispatch(
                                        terminateFriend(friend.id)
                                    );
                                }}
                            >
                                Terminate Friend
                            </button>
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
                            <img
                                src={pender.image || "/default.jpg"}
                                className="main-profile-pic"
                            />
                            <p>
                                {pender.first} {pender.last}
                            </p>
                            <button
                                onClick={() => {
                                    this.props.dispatch(
                                        acceptFriend(pender.id)
                                    );
                                }}
                            >
                                Accept Friend Request
                            </button>
                        </div>
                    );
                })}
            </div>
        );
        return (
            <div>
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
