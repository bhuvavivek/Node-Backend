const express = require("express");
const { connectMongoDb } = require("./db/connection");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const app = express();

const PORT = 8000;

// connect to mongodb

connectMongoDb("mongodb://127.0.0.1:27017/UrlShortner")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

// middlewares
app.use(express.json());
// Route
app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId: shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } },
    { new: true }
  );
  // if (!entry) {
  //   return res.status(404).send("URL not found");
  // }

  console.log(entry);
  res.redirect(entry.redirectURL);
});

// start the server
app.listen(8000, (req, res) => console.log(`Server is running at ${PORT})`));
