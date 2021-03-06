const express = require("express");

const PostRouter = require("../posts/post-router.js");

// const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.use("/api/posts", PostRouter);

server.get("/", (req,res) => {
    res.status(200).json({ api: "Up"})
})

module.exports = server;
