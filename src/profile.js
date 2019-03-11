import React from "react";

import BioEditor from "./bioeditor";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showBioEditor = this.showBioEditor.bind(this);
        this.textValue = this.textValue.bind(this);
        this.closeBioEditor = this.closeBioEditor.bind(this);
        console.log(this.props);
    }
    showBioEditor() {
        if (this.state.editorIsVisible) {
            this.setState({
                editorIsVisible: false
            });
        } else {
            this.setState({
                editorIsVisible: true
            });
        }
    }
    closeBioEditor() {
        this.setState({
            editorIsVisible: false
        });
    }
    textValue(val) {
        this.setState({
            textVal: val
        });
    }
    render() {
        const image = this.props.image || "/default.jpg";
        return (
            <div>
                <img
                    src={image}
                    alt={`${this.props.first} ${this.props.last}`}
                    className="main-profile-pic"
                />
                <p>
                    {this.props.first} {this.props.last}
                </p>
                <p>{this.props.bio}</p>
                {this.props.bio ? (
                    <a href="javascript:0" onClick={this.showBioEditor}>
                        Edit Your Bio!
                    </a>
                ) : (
                    <a href="javascript:0" onClick={this.showBioEditor}>
                        Add Your Bio!
                    </a>
                )}
                {this.state.editorIsVisible && (
                    <BioEditor
                        id={this.props.id}
                        first={this.props.first}
                        last={this.props.last}
                        bio={this.props.bio}
                        setBio={this.props.setBio}
                        textValue={this.textValue}
                        textVal={this.state.textVal}
                        closeBioEditor={this.closeBioEditor}
                    />
                )}
            </div>
        );
    }
}
