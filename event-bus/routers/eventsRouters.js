const { default: axios } = require("axios");
const express = require("express");
const router = new express.Router();
// const { v4: uuidv4 } = require("uuid");
// const { check, validationResult } = require("express-validator");

// we will not use a database for this project

router.post("/events", (req, res) => {
  const event = req.body;

  axios.post("http://localhost:5000/api/posts/events", event).catch((err) => {
    console.error({ msg: err.message, errorCode: err.code });
  });

  axios
    .post("http://localhost:5001/api/comments/events", event)
    .catch((err) => {
      console.error({ msg: err.message, errorCode: err.code });
    });

  axios.post("http://localhost:5002/api/query/events", event).catch((err) => {
    console.error({ msg: err.message, errorCode: err.code });
  });

  axios
    .post("http://localhost:5003/api/moderation/events", event)
    .catch((err) => {
      console.error({ msg: err.message, errorCode: err.code });
    });

  res.send({ status: "OK" });
});

module.exports = router;
