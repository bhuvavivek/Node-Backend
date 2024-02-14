const express = require("express");
const {
  handleGenerateNewShortURL,
  handleAnylitics,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleAnylitics);

module.exports = router;
