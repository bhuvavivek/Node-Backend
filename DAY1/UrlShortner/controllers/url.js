const shortid = require("shortid");
const URL = require("../models/url");
async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is Required" });

  const shortID = shortid.generate();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortID });
}

async function handleAnylitics(req, res) {
  const shortId = req.params.shortId;

  const result = await URL.findOne({ shortId: shortId });
  res.json({ totleClick: result.visitHistory.length, visitHistory: result });
}

module.exports = { handleGenerateNewShortURL, handleAnylitics };
