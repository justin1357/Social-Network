import React from "react";
import FriendButton from "./friendbutton";
import { connect } from "react-redux";
import { otherProfile } from "./actions";

class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.dispatch(otherProfile(this.props.match.params.id));
    }
    render() {
        if (!this.props.user) {
            return null;
        } else {
            const image = this.props.user.image || "/default.jpg";
            return (
                <div>
                    <img
                        src={image}
                        alt={`${this.state.first} ${this.state.last}`}
                        className="main-profile-pic"
                    />
                    <div className="info-container">
                        <p className="name">
                            {this.props.user.first} {this.props.user.last}
                        </p>
                        <p className="bio"> {this.props.user.bio}</p>

                        <FriendButton
                            otherUserId={this.props.match.params.id}
                        />
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(OtherProfile);
