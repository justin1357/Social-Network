import React from "react";
import axios from "./axios";

export default function Uploader(props) {
    console.log(props);
    return (
        <div className="uploader">
            <a href="javascript:0" id="X">
                <p onClick={props.closeUploader}>X</p>
            </a>
            <h1>Upload your file</h1>
            <input
                type="file"
                name="file"
                className="inputfile"
                onChange={e => {
                    props.closeUploader();
                    const fd = new FormData();
                    fd.append("file", e.target.files[0]);
                    axios
                        .post("/upload", fd)
                        .then(data => {
                            props.setImage(data.data[0].image);
                        })
                        .catch(err => {
                            console.log("err with upload", err);
                        });
                }}
            />
        </div>
    );
}
