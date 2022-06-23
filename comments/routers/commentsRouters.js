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

    await axios
      .post("http://event-bus-srv:5005/api/events", {
        type: "CommentCreated",
        data: { id: commentId, comment, postId, status: "pending" },
      })
      .catch((err) => {
        console.error(err);
      });

    res.status(201).send(existingComments);
  }
);

router.post("/comments/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status } = data;

    const comments = commentsByPostId[postId];
    const comment = comments.find((c) => c.id === id);
    comment.status = status;

    await axios
      .post("http://event-bus-srv:5005/api/events", {
        type: "CommentUpdated",
        data: { ...comment, postId },
      })
      .catch((err) => {
        console.error(err);
      });
  }

  res.send({});
});

module.exports = router;
