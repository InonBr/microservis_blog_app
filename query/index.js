const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 5002;

app.use(cors());
app.use(express.json());

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

  if (type === "CommentUpdated") {
    const { id, comment, postId, status } = data;

    const post = posts[postId];
    const updatedComment = post.comments.find((comment) => comment.id === id);

    updatedComment.status = status;
    updatedComment.content = comment;
  }
};

app.get("/api/query/posts", (req, res) => {
  res.send(posts);
});

app.post("/api/query/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.listen(port, async () => {
  console.log(`🟢 app listening on port http://localhost:${port}`);

  try {
    const response = await axios
      .get("http://event-bus-srv:5005/api/allEvents")
      .catch((err) => {
        console.error({ msg: err.message, errorCode: err.code });
      });

    console.log(response);

    for (const event of response.data) {
      console.log("Processing event:", event.type);

      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.log(error.message);
  }
});
