const express = require("express");
const router = new express.Router();

const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, comment, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, comment, status });
  }

  if (type == "CommentUpdated") {
    const { id, comment, postId, status } = data;

    const post = posts[postId];
    const updatedComment = post.comments.find((c) => c.id === id);

    updatedComment.status = status;
    updatedComment.comment = comment;
  }
};

router.get("/posts", (req, res) => {
  res.send(posts);
});

router.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

module.exports = { router, handleEvent };
