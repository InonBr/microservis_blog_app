const express = require("express");
const router = new express.Router();
const { v4: uuidv4 } = require("uuid");
const { check, validationResult } = require("express-validator");
const axios = require("axios");

// we will not use a database for this project
const commentsByPostId = {};

router.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  const response = commentsByPostId[postId] || [];

  res.send(response);
});

router.post(
  "/posts/:id/comments",
  [check("comment", "comment is required").trim().not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const postId = req.params.id;
    const commentId = uuidv4();
    const { comment } = req.body;

    const existingComments = commentsByPostId[postId] || [];

    existingComments.push({ id: commentId, comment, status: "pending" });

    commentsByPostId[postId] = existingComments;

    await axios.post("http://localhost:5005/api/events", {
      type: "CommentCreated",
      data: { id: commentId, comment, postId, status: "pending" },
    });

    res.status(201).send(existingComments);
  }
);

router.post("/comments/events", (req, res) => {
  const event = req.body;

  console.log(event);

  res.send(event);
});

module.exports = router;
