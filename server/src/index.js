const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to Campus Connect!");
});

app.listen(5000, () => {
    console.log("Server started");
});