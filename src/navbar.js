import React from "react";
import ProfilePic from "./profilepic";
import { Link } from "react-router-dom";

export default function Navbar(props) {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="navbar-brand" href="#">
                    Nasa!!!
                </div>
                <Link to="/friends" className="nav-item nav-link friends-link">
                    Friends
                </Link>
                <ProfilePic
                    id={props.id}
                    first={props.first}
                    last={props.last}
                    image={props.image}
                    showUploader={props.showUploader}
                />
            </nav>
        </div>
    );
}

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
