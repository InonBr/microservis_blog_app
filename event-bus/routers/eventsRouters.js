const { default: axios } = require("axios");
const express = require("express");
const router = new express.Router();

// we will not use a database for this project
const events = [];

router.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios
    .post("http://posts-clusterip-srv:5000/api/posts/events", event)
    .catch((err) => {
      console.error({ msg: err.message, errorCode: err.code });
    });

  // axios
  //   .post("http://localhost:5001/api/comments/events", event)
  //   .catch((err) => {
  //     console.error({ msg: err.message, errorCode: err.code });
  //   });

  // axios.post("http://localhost:5002/api/query/events", event).catch((err) => {
  //   console.error({ msg: err.message, errorCode: err.code });
  // });

  // axios
  //   .post("http://localhost:5003/api/moderation/events", event)
  //   .catch((err) => {
  //     console.error({ msg: err.message, errorCode: err.code });
  //   });

  res.send({ status: "OK" });
});

router.get("/allEvents", (req, res) => {
  res.send(events);
});

module.exports = router;
