import React from "react";
import axios from "./axios";

export default function BioEditor(props) {
    return (
        <div className="bio-editor">
            <textarea
                id="textarea"
                rows="6"
                cols="50"
                onChange={() => {
                    let val = document.getElementById("textarea").value;
                    props.textValue(val);
                }}
            />
            <button
                className="save-button"
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
