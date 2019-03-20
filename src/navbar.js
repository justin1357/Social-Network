import React from "react";
import ProfilePic from "./profilepic";
import Navbar from "react-bootstrap/Navbar";
import axios from "./axios";
import { Link } from "react-router-dom";
import { Nav, Form, FormControl, Button } from "react-bootstrap";

export default class CustomNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log(this.state);
        this.handleInput = this.handleInput.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleInput(e) {
        console.log("length", e.target.value.length);
        if (e.target.value.length) {
            axios
                .post("/inc-search", { inputValue: e.target.value })
                .then(data => {
                    console.log(data);
                    this.setState({
                        data: data.data.rows
                    });
                    console.log("nav state", this.state);
                });
        } else {
            this.setState({
                data: null
            });
        }
    }
    handleClick() {
        this.setState({
            data: null
        });
        this.input.value = null;
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark" className="nav">
                <Link to="/">
                    <ProfilePic
                        className="float-right"
                        id={this.props.id}
                        first={this.props.first}
                        last={this.props.last}
                        image={this.props.image}
                        showUploader={this.props.showUploader}
                    />
                </Link>
                <Nav className="mr-auto" />
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav>
                        <Link
                            to="/friends"
                            className="nav-item nav-link friends-link"
                        >
                            Friends
                        </Link>
                        <Link
                            to="/online"
                            className="nav-item nav-link friends-link"
                        >
                            Online
                        </Link>
                        <Link
                            to="/chat"
                            className="nav-item nav-link friends-link"
                        >
                            Chat
                        </Link>
                    </Nav>
                </Navbar.Collapse>

                {!!this.state.data && (
                    <div id="results">
                        {this.state.data.map(item => {
                            return (
                                <Link to={`/user/${item.id}`} key={item.id}>
                                    <div
                                        className="result"
                                        onClick={this.handleClick}
                                    >
                                        <img
                                            src={item.image || "/default.jpg"}
                                            alt="search profile pic"
                                            className="mini-image"
                                        />
                                        <p className="text-dark list-item">
                                            {item.first}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
                <Form inline className="form">
                    <FormControl
                        type="text"
                        placeholder="Search"
                        className="mr-sm-2"
                        id="input"
                        ref={elem => (this.input = elem)}
                        onChange={this.handleInput}
                    />

                    <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>
        );
    }
}
