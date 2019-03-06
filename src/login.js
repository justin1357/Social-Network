import React from "react";
export { login } from "./login";
import { Link } from "react-router-dom";
import axios from "./axios";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
    }
    submit() {
        axios
            .post("/login", {
                email: this.email,
                password: this.password
            })
            .then(({ data }) => {
                console.log(data);
                if (data.sucess) {
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
                <button onClick={e => this.submit(e)}>Log in!</button>
                <Link to="/">Click here to Register</Link>
            </div>
        );
    }
}
