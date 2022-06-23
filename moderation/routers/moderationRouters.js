const express = require("express");
const router = new express.Router();
const axios = require("axios");

router.post("/moderation/events", async (req, res) => {
  const { data, type } = req.body;

  if (type === "CommentCreated") {
    const status = data.comment.includes("orange") ? "rejected" : "approved";

    await axios
      .post("http://event-bus-srv:5005/api/events", {
        type: "CommentModerated",
        data: { ...data, status },
      })
      .catch((err) => {
        console.error(err);
      });
  }

  res.send({});
});

module.exports = router;
