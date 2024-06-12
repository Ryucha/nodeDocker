require("dotenv").config();
const express = require('express')
const app = express();
const mongoose = require('mongoose');
const expressSession = require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const port = 3000

const db = require('./mongoose')();
const mongoStore = MongoStore.create({
    mongoUrl: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
});

const cat = require('./router/cat.js')
const user = require("./router/user.js");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    store: mongoStore,
},
))
app.use(cookieParser());

app.use("/cat", cat);
app.use("/user", user);
app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    console.log(err);

    res.status(err.status || 500);
    res.send(err.message);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}) 