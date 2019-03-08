import React from "react";
import axios from "./axios";

export default function BioEditor(props) {
    return (
        <div>
            <textarea
                id="textarea"
                rows="4"
                cols="50"
                onChange={() => {
                    let val = document.getElementById("textarea").value;
                    props.textValue(val);
                }}
            />
            <button
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
