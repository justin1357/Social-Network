const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./db");
const bcrypt = require("./bcrypt");
const body = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
//////////////////////////////
app.use(compression());
app.use(body.json());
app.use(express.static("./public"));
app.use(cookieParser());
app.use(
    cookieSession({
        secret: process.env.Cookie || "secret",
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);
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
                        res.json((data.success = true));
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
app.listen(8080, function() {
    console.log("I'm listening.");
});