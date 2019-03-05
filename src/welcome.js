import React from "react";
import Registration from "./registration";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <h1>Welcome</h1>
                <img src="/nasa-logo.jpg" />
                <p>Welcome to our social network</p>
                <Registration />
            </div>
        );
    }
}
