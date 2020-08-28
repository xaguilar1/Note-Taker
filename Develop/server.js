
const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const db = require("./db/db.json");
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("listeing on port: " + PORT);
})

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));

app.get("./public/notes", (req, res) => {
    return res.json(db);
})

app.get("./public/index.html", (req, res) => {
    return res.json()
})
