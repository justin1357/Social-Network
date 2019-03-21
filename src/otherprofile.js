import React from "react";
import FriendButton from "./friendbutton";
import { connect } from "react-redux";
import { otherProfile } from "./actions";
import axios from "./axios";

class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.dispatch(otherProfile(this.props.match.params.id));
        axios
            .get("/get-otherprofile-posts/" + this.props.match.params.id)
            .then(data => {
                console.log("data from axios", data.data);
                this.setState({
                    posts: data.data.rows.reverse()
                });
                console.log("this.posts", this.state.posts);
            });
    }
    render() {
        const posts = this.state.posts;
        if (!this.props.user || !posts) {
            return null;
        } else {
            const image = this.props.user.image || "/default.jpg";
            return (
                <div className="row">
                    <div className="card container border-0  bg-transparent col-4">
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
                    <div className="col-8">
                        {posts.map(post => {
                            console.log("post", post);
                            return (
                                <div key={post.id} className="post-box">
                                    <p className="text-dark post-text">
                                        {post.post}
                                    </p>
                                    <p className="text-dark creator">
                                        {post.first} {post.last}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.otherProfile
    };
};

export default connect(mapStateToProps)(OtherProfile);
