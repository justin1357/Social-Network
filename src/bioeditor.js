import React from "react";
import axios from "./axios";

export default function BioEditor(props) {
    return (
        <div className="bio-editor">
            <div className="input-group">
                <textarea
                    className="form-control"
                    id="textarea"
                    onChange={() => {
                        let val = document.getElementById("textarea").value;
                        props.textValue(val);
                    }}
                />
            </div>
            <button
                className="btn btn-primary"
                onClick={() => {
                    props.closeBioEditor();
                    axios
                        .post("/uploadBio", { text: props.textVal })
                        .then(data => {
                            console.log(data);
                            props.setBio(data.data.rows[0].bio);
                        });
                }}
            >
                Save
            </button>
        </div>
    );
}
