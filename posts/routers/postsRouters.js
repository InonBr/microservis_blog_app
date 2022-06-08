const express = require("express");
const router = new express.Router();
const { v4: uuidv4 } = require("uuid");
const { check, validationResult } = require("express-validator");

// we will not use a database for this project
const posts = {};

router.get("/", (req, res) => {
  res.send(posts);
});

router.post(
  "/",
  [check("title", "title is required").trim().not().isEmpty()],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title } = req.body;
    const id = uuidv4();
    const newPost = { id, title };

    posts[id] = newPost;

    res.status(201).send({ ...newPost, msg: "post created" });
  }
);

module.exports = router;