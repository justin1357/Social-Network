import React from "react";
import axios from "./axios";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios.get(`/api-user/${this.props.match.params.id}`).then(data => {
            if (data.data.success == false) {
                this.props.history.push("/");
            } else {
                this.setState(data.data.rows[0]);
            }
        });
    }
    render() {
        const image = this.state.image || "/default.jpg";
        return (
            <div>
                <img
                    src={image}
                    alt={`${this.state.first} ${this.state.last}`}
                    className="main-profile-pic"
                />
                <p>
                    {this.state.first} {this.state.last}
                </p>
                <p>{this.state.bio}</p>
            </div>
        );
    }
}
