import React from "react";
import axios from "axios";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
    }
    submit() {
        console.log("link was clicked", this.email);
        axios
            .post("/register", {
                first: this.first,
                last: this.last,
                email: this.email,
                password: this.password
            })
            .then(({ data }) => {
                console.log(data);
                if (data) {
                    console.log("success");
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }
    render() {
        return (
            <div>
                {this.state.error && (
                    <div className="error">Oops, You made a Boo Boo!</div>
                )}
                <input
                    name="first"
                    placeholder="First Name"
                    type="text"
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="last"
                    placeholder="Last Name"
                    type="text"
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="email"
                    placeholder="Email"
                    type="email"
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={e => this.handleChange(e)}
                />
                <button onClick={e => this.submit(e)}>Register</button>
            </div>
        );
    }
}
