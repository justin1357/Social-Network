import React from "react";

export default function ProfilePic(props) {
    const image = props.image || "/default.jpg";
    return (
        <img
            src={image}
            alt={`${props.first} ${props.last}`}
            onClick={props.uploader}
            className="profile-pic"
        />
    );
}
