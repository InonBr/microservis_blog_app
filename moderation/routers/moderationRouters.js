const express = require("express");
const router = new express.Router();
const axios = require("axios");

router.post("/moderation/events", async (req, res) => {
  const { data, type } = req.body;

  if (type === "commentCreated") {
    const status = data.comment.includes("orange") ? "rejected" : "approved";

    await axios.post("http://localhost:5005/api/events", {
      type: "CommentModerated",
      data: { ...data, status },
    });
  }

  res.send({});
});

module.exports = router;
