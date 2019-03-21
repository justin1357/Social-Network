import React from "react";
import Uploader from "./uploader";
import BioEditor from "./bioeditor";
import { Button } from "react-bootstrap";
import axios from "./axios";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showBioEditor = this.showBioEditor.bind(this);
        this.textValue = this.textValue.bind(this);
        this.closeBioEditor = this.closeBioEditor.bind(this);
        this.showUploader = this.showUploader.bind(this);
        this.closeUploader = this.closeUploader.bind(this);
        this.postTextValue = this.postTextValue.bind(this);
    }
    componentDidMount() {
        axios.get("get-posts").then(data => {
            console.log(data.data.rows);
            this.setState({
                posts: data.data.rows.reverse()
            });
            console.log("this.posts", this.state.posts);
        });
    }
    setPosts(post) {
        let newArray = this.state.posts;
        // newArray = newArray.reverse();
        newArray.unshift(post);
        console.log("newArray", newArray);
        this.setState({
            posts: newArray
        });
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
    postTextValue(val) {
        this.setState({
            postTextVal: val
        });
    }
    render() {
        const posts = this.state.posts;
        console.log("posts var", posts);
        const image = this.props.image || "/default.jpg";
        if (!posts) {
            return null;
        }
        return (
            <div className="row">
                <div className="card container border-0  bg-transparent col-4">
                    <img
                        src={image}
                        className="card-img-top ml-3"
                        alt="..."
                        onClick={this.showUploader}
                    />
                    <div className="card-body d-none d-md-block">
                        <h5 className="card-title">
                            {this.props.first} {this.props.last}
                        </h5>
                        <p className="card-text">{this.props.bio}</p>
                        {this.props.bio ? (
                            <button
                                href="javascript:0"
                                className="btn btn-primary"
                                onClick={this.showBioEditor}
                            >
                                Edit Your Bio!
                            </button>
                        ) : (
                            <button
                                href="javascript:0"
                                className="btn btn-primary"
                                onClick={this.showBioEditor}
                            >
                                Add Your Bio!
                            </button>
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
                    {this.state.uploaderIsVisible && (
                        <Uploader
                            setImage={this.setImage}
                            closeUploader={this.closeUploader}
                        />
                    )}
                </div>
                <div className="col-8">
                    <h1 className="post-here">Post here</h1>
                    <textarea
                        id="post-text"
                        ref={elem => (this.postText = elem)}
                        onChange={() => {
                            let postTextVal = document.getElementById(
                                "post-text"
                            ).value;
                            this.postTextValue(postTextVal);
                        }}
                    />
                    <div>
                        <Button
                            onClick={() => {
                                this.postText.value = null;
                                let data;
                                axios
                                    .post("/add-post", {
                                        post: this.state.postTextVal
                                    })
                                    .then(data => {
                                        console.log("state", this.state.posts);
                                        console.log(
                                            "new post",
                                            data.data.rows[0]
                                        );
                                        data = data.data.rows[0];
                                        this.setPosts(data);
                                    });
                            }}
                        >
                            Post!
                        </Button>

                        {posts.map(post => {
                            console.log("post", post);
                            return (
                                <div key={post.id} className="post-box">
                                    <p className="text-dark post-text">
                                        {post.post}
                                    </p>
                                    <p className="text-dark creator">
                                        {post.first} {post.last}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
