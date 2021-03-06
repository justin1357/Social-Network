import React from "react";
import axios from "./axios";
import Profile from "./profile";
import Friends from "./friends";
import Online from "./online";
import CustomNavbar from "./navbar";
import OtherProfile from "./otherprofile";
import Chat from "./chat";
import Jumbotron from "react-bootstrap/Jumbotron";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route } from "react-router-dom";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false
        };
        this.setImage = this.setImage.bind(this);
        this.setBio = this.setBio.bind(this);
    }
    componentDidMount() {
        axios.get("/user").then(data => {
            this.setState(data.data.rows[0]);
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
                            <CustomNavbar
                                id={this.state.id}
                                first={this.state.first}
                                last={this.state.last}
                                image={this.state.image}
                                showUploader={this.showUploader}
                            />
                            <Jumbotron className="container jimbo">
                                <Container>
                                    <div id="jimbo">
                                        <h1 className="text-dark jimbotext">
                                            Spiced Social Network!!!
                                        </h1>
                                        <p className="text-dark jimbotext">
                                            From the creators of the Petition
                                            Project, we give you our newest
                                            creation.
                                        </p>
                                        <p className="text-dark jimbotext">
                                            A social network for React
                                            education.
                                        </p>
                                    </div>
                                </Container>
                            </Jumbotron>
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

                            <Route
                                path="/user/:id"
                                render={props => (
                                    <OtherProfile
                                        key={props.match.url}
                                        match={props.match}
                                        history={props.history}
                                    />
                                )}
                            />
                            <Route path="/friends" component={Friends} />
                            <Route path="/online" component={Online} />
                            <Route path="/chat" component={Chat} />
                        </div>
                    </BrowserRouter>
                </div>
            );
        }
    }
}
