const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  const shortId = shortid();
  await URL.create({ shortId, redirectURL: url, visitHistory: [] });

  return res.json({ id: shortId });
}

async function handleGetAnalytics(req, res) {
  const { shortId } = req.params;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = { handleGenerateNewShortURL, handleGetAnalytics };
