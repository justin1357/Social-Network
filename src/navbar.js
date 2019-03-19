import React from "react";
import ProfilePic from "./profilepic";
import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

export default function CustomNavbar(props) {
    console.log(props);
    return (
        <Navbar bg="dark" variant="dark" className="nav">
            <Link to="/">
                <ProfilePic
                    className="float-right"
                    id={props.id}
                    first={props.first}
                    last={props.last}
                    image={props.image}
                    showUploader={props.showUploader}
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
                    <Link to="/chat" className="nav-item nav-link friends-link">
                        Chat
                    </Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
