const mongoose = require("mongoose");

const urlSchama = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: {
      type: Array,
      default: [{ timestamp: { type: Number } }],
    },
  },
  { timestamps: true }
);

const URL = mongoose.model("UrlSchema", urlSchama);

module.exports = URL;
