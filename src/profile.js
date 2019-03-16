import React from "react";
import Uploader from "./uploader";
import BioEditor from "./bioeditor";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showBioEditor = this.showBioEditor.bind(this);
        this.textValue = this.textValue.bind(this);
        this.closeBioEditor = this.closeBioEditor.bind(this);
        this.showUploader = this.showUploader.bind(this);
        this.closeUploader = this.closeUploader.bind(this);
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
    showUploader() {
        this.setState(() => {
            return { uploaderIsVisible: true };
        });
        console.log(this.state);
    }
    closeUploader() {
        this.setState(() => {
            return { uploaderIsVisible: false };
        });
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
            <div className="card container border-0 mt-5 bg-transparent">
                <img
                    src={image}
                    className="card-img-top ml-3"
                    alt="..."
                    onClick={this.showUploader}
                />
                <div className="card-body">
                    <h5 className="card-title">
                        {this.props.first} {this.props.last}
                    </h5>
                    <p className="card-text">{this.props.bio}</p>
                    <button
                        href="javascript:0"
                        className="btn btn-primary"
                        onClick={this.showBioEditor}
                    >
                        Add Your Bio!
                    </button>
                </div>
                {this.state.uploaderIsVisible && (
                    <Uploader
                        setImage={this.setImage}
                        closeUploader={this.closeUploader}
                    />
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

// <div>
//     <div className="image">
//         <img
//             src={image}
//             alt={`${this.props.first} ${this.props.last}`}
//             className="main-profile-pic"
//         />
//     </div>
//     <div className="info-container">
//         <p className="name">
//             {this.props.first} {this.props.last}
//         </p>
//         <p className="bio">{this.props.bio}</p>
//
//         {this.props.bio ? (
//             <button
//                 href="javascript:0"
//                 onClick={this.showBioEditor}
//             >
//                 Edit Your Bio!
//             </button>
//         ) : (
//             <button
//                 href="javascript:0"
//                 onClick={this.showBioEditor}
//             >
//                 Add Your Bio!
//             </button>
//         )}
//     </div>
//     {this.state.editorIsVisible && (
//         <BioEditor
//             id={this.props.id}
//             first={this.props.first}
//             last={this.props.last}
//             bio={this.props.bio}
//             setBio={this.props.setBio}
//             textValue={this.textValue}
//             textVal={this.state.textVal}
//             closeBioEditor={this.closeBioEditor}
//         />
//     )}
// </div>
