import React from "react";
import axios from "./axios";
import Uploader from "./uploader";
import Profile from "./profile";
import Friends from "./friends";
import Navbar from "./navbar";
import OtherProfile from "./otherprofile";
import { BrowserRouter, Route } from "react-router-dom";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false
        };
        this.showUploader = this.showUploader.bind(this);
        this.closeUploader = this.closeUploader.bind(this);
        this.setImage = this.setImage.bind(this);
        this.setBio = this.setBio.bind(this);
    }
    componentDidMount() {
        axios.get("/user").then(data => {
            this.setState(data.data.rows[0]);
        });
    }
    showUploader() {
        this.setState(() => {
            return { uploaderIsVisible: true };
        });
    }
    closeUploader() {
        this.setState(() => {
            return { uploaderIsVisible: false };
        });
    }
    setImage(image) {
        this.setState({
            image: image
        });
    }
    setBio(bio) {
        this.setState({
            bio: bio,
            bioIsNot: false
        });
    }
    render() {
        if (!this.state.id) {
            return null;
        } else {
            return (
                <div>
                    <BrowserRouter>
                        <div>
                            <Navbar
                                id={this.state.id}
                                first={this.state.first}
                                last={this.state.last}
                                image={this.state.image}
                                showUploader={this.showUploader}
                            />
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <Profile
                                        id={this.state.id}
                                        first={this.state.first}
                                        last={this.state.last}
                                        image={this.state.image}
                                        onClick={this.showUploader}
                                        bio={this.state.bio}
                                        setBio={this.setBio}
                                    />
                                )}
                            />

                            <Route path="/user/:id" component={OtherProfile} />
                            <Route path="/friends" component={Friends} />
                        </div>
                    </BrowserRouter>
                    {this.state.uploaderIsVisible && (
                        <Uploader
                            setImage={this.setImage}
                            closeUploader={this.closeUploader}
                        />
                    )}
                </div>
            );
        }
    }
}
