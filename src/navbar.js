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
                    <Link to="/" className="nav-item nav-link friends-link">
                        Chat
                    </Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

// <nav
//     className="navbar navbar-expand-lg navbar-light bg-light"
//     id="navbar"
// >
//     <div className="navbar-brand" href="#">

//     </div>
// <Link to="/friends" className="nav-item nav-link friends-link">
//     Friends
// </Link>
// </nav>
// <div className="nav-bar">
//     <img src="/nasa-logo.jpg" alt="nasa logo" className="logo" />
//     <div className="nav-right">
//
// <ProfilePic
//     id={props.id}
//     first={props.first}
//     last={props.last}
//     image={props.image}
//     showUploader={props.showUploader}
// />
//     </div>
// </div>
