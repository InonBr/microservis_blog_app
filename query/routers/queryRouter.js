const express = require("express");
const router = new express.Router();

const posts = {};

router.get("/posts", (req, res) => {
  res.send(posts);
});

router.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, comment, postId } = data;

    const post = posts[postId];
    post.comments.push({ id, comment });
  }

  console.log(posts);

  res.send({});
});

module.exports = router;
