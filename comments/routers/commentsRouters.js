const express = require("express");
const router = new express.Router();
const { v4: uuidv4 } = require("uuid");
const { check, validationResult } = require("express-validator");

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
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const postId = req.params.id;
    const commentId = uuidv4();
    const { comment } = req.body;

    const existingComments = commentsByPostId[postId] || [];

    existingComments.push({ id: commentId, comment });

    commentsByPostId[postId] = existingComments;

    res.status(201).send(existingComments);
  }
);

module.exports = router;
