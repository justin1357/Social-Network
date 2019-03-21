const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./db");
const bcrypt = require("./bcrypt");
const body = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const s3 = require("./s3");
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });
//////////////////////////////
app.use(compression());
app.use(body.json());
app.use(express.static("./public"));
app.use(cookieParser());
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});
app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
app.use(csurf());
app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});
/////////////////////////////////
if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}
// function requireLoggedInUser(req, res, next) {
//     if (!req.session.userId) {
//         res.sendStatus(403);
//     } else {
//         next();
//     }
// }
//////////////////////////////
var multer = require("multer");
var uidSafe = require("uid-safe");
var path = require("path");

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});
var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});
//////////////////////////////
app.post("/register", (req, res) => {
    if (
        req.body.first == "" ||
        req.body.last == "" ||
        req.body.password == "" ||
        req.body.email == ""
    ) {
        res.json((res.error = true));
    } else {
        bcrypt
            .hashPassword(req.body.password)
            .then(pass => {
                return db
                    .register(
                        req.body.first,
                        req.body.last,
                        req.body.email,
                        pass
                    )
                    .then(data => {
                        req.session.userId = data.rows[0].id;
                        res.json({ success: true });
                    })
                    .catch(err => {
                        console.log("err in register", err);
                    });
            })
            .catch(err => {
                console.log("catch 1", err);
                res.json((res.error = true));
                return;
            });
    }
});
app.post("/login", (req, res) => {
    db.getEmail(req.body.email)
        .then(data => {
            let user_id = data.rows[0].id;
            bcrypt
                .checkPassword(req.body.password, data.rows[0].password)
                .then(doesMatch => {
                    if (doesMatch) {
                        req.session.userId = user_id;
                        res.json({ sucess: true });
                    } else {
                        res.json({ sucess: false });
                    }
                })
                .catch(err => {
                    console.log("get pass", err);
                    res.json({ sucess: false });
                });
        })
        .catch(err => {
            res.json({ sucess: false });
            console.log("err in db.getEmail", err);
        });
});
app.post("/upload", uploader.single("file"), s3.upload, function(req, res) {
    let url =
        "https://s3.amazonaws.com/image-bucket-imageboard/" + req.file.filename;
    if (req.file) {
        db.uploadProfilePic(url, req.session.userId)
            .then(data => {
                res.json(data.rows);
            })
            .catch(err => {
                console.log("err in uploadProfilePic", err);
            });
    } else {
        res.json({
            success: false
        });
    }
});
app.post("/uploadBio", (req, res) => {
    db.uploadBio(req.body.text, req.session.userId)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log("err in uploadBio", err);
        });
});
app.get("/user", (req, res) => {
    db.getUser(req.session.userId)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log("err in getUser", err);
        });
});
app.get(`/api-user/:id`, (req, res) => {
    if (req.session.userId == req.params.id) {
        res.json({ success: false });
    } else {
        db.getUser(req.params.id)
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                console.log("an err in other user get", err);
            });
    }
});
app.get("/get-status/:id", (req, res) => {
    db.getStatus(req.session.userId, req.params.id)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log("err in getStatus", err);
        });
});
app.post("/send-friend-request", (req, res) => {
    db.sendFriendRequest(req.session.userId, req.body.Id)
        .then(() => {
            res.json({ success: true });
        })
        .catch(err => {
            console.log("errr in sendFriendRequest", err);
        });
});
app.post("/delete-friend-request", (req, res) => {
    db.deleteFriendRequest(req.session.userId, req.body.Id)
        .then(() => {
            res.json({ success: true, id: req.body.Id });
        })
        .catch(err => {
            console.log("err in deleteFriendRequest", err);
        });
});
app.post("/accept-friend-request", (req, res) => {
    db.acceptFriendRequest(req.session.userId, req.body.Id)
        .then(() => {
            res.json({ success: true, id: req.body.Id });
        })
        .catch(err => {
            console.log("err in deleteFriendRequest", err);
        });
});
app.get("/get-all-friends", (req, res) => {
    db.getFriends(req.session.userId)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log("Err in get-all-friends", err);
        });
});
app.post("/inc-search", (req, res) => {
    console.log(req.body.inputValue);
    db.incSearch(req.body.inputValue)
        .then(data => {
            console.log(data);
            res.json(data.rows);
        })
        .catch(err => {
            console.log("err in incSearch", err);
        });
});
app.post("/add-post", (req, res) => {
    let postId;
    db.post(req.body.post, req.session.userId)
        .then(data => {
            console.log(data);
            postId = data.rows[0].id;
        })
        .then(() => {
            db.getAddedPost(postId).then(data => {
                res.json(data);
            });
        })
        .catch(err => {
            console.log("err in adding posts", err);
        });
});
app.get("/get-posts", (req, res) => {
    db.getPosts(req.session.userId).then(data => {
        res.json(data);
    });
});
app.get("/get-otherprofile-posts/:id", (req, res) => {
    db.getPosts(req.params.id).then(data => {
        res.json(data);
    });
});
//////////////////////////////
app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
////////////////////////////////
server.listen(8080, function() {
    console.log("I'm listening.");
});
///////////////////////////////
const onlineUsers = {};

io.on("connection", function(socket) {
    console.log(`socket with the id ${socket.id} is now connected`);
    const userId = socket.request.session.userId;
    onlineUsers[socket.id] = userId;
    if (!userId) {
        return socket.disconnect();
    }

    let alreadyHere =
        Object.values(onlineUsers).filter(id => id != userId).length > 1;

    db.getOnlineUsers(Object.values(onlineUsers))
        .then(data => {
            // console.log(data);
            socket.emit("onlineUsers", {
                onlineUsers: data
            });
        })
        .catch(err => {
            console.log("err in getOnlineUsers", err);
        });

    if (!alreadyHere) {
        db.getNewUser(userId)
            .then(data => {
                socket.broadcast.emit("userJoined", {
                    onlineUsers: data.rows[0]
                });
            })
            .catch(err => {
                console.log("err in getnew user", err);
            });
    }

    socket.on("disconnect", () => {
        console.log("Disconnect", socket.id);
        let id = onlineUsers[socket.id];
        delete onlineUsers[socket.id];
        console.log("online users after delete", onlineUsers);
        const values = Object.values(onlineUsers);
        for (var i = 0; i < values.length; i++) {
            if (values[i] == id) {
                console.log("User is still logged in");
            } else {
                io.emit("userLeft", {
                    userLeft: id
                });
            }
        }
    });

    console.log(onlineUsers);

    socket.on("newChatMessage", data => {
        let messageId;
        db.addNewMessage(data, userId)
            .then(data => {
                console.log("success");
                messageId = data.rows[0].id;
            })
            .then(() => {
                db.getUserLastMessage(messageId).then(data => {
                    io.emit("newMessage", {
                        messages: data.rows[0]
                    });
                });
            })

            .catch(err => {
                console.log("err in user info", err);
            });

        //db.query to get info about person who sent message
        //push message and info about the message to array of messages
    });
    db.getLastMessages()
        .then(data => {
            socket.emit("messages", {
                messages: data.rows
            });
        })
        .catch(err => {
            console.log("err in getlast massegase", err);
        });
});
