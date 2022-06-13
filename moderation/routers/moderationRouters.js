const express = require("express");
const router = new express.Router();
const axios = require("axios");

router.post("/moderation/events", async (req, res) => {
  const { event } = req.body;
});

module.exports = router;
